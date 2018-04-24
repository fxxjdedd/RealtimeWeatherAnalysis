package com.graduation.weather.analysis

import com.google.gson.Gson
import com.graduation.weather.utils.MyRedis
import kafka.serializer.StringDecoder
import org.apache.commons.pool2.impl.GenericObjectPoolConfig
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.spark.SparkConf
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.slf4j.LoggerFactory
import redis.clients.jedis.{Jedis, JedisPool, JedisPoolConfig}
/**
  * Created by apple on 2018/2/19.
  */
object RealtimeAnalysis {
  /**
    *
    * @param city   城市
    * @param date   日期
    * @param TEMP   平均气温, 缺省值:9999.9, 单位华氏度 and tenths
    * @param DEWP   平均露点, 缺省值:9999.9, 单位华氏度 and tenths
    * @param SLP    平均海平面气压, 缺省值:9999.9, 单位millibars and tenths
    * @param STP    平均收集站气压, 缺省值:9999.9, 单位millibars and tenths
    * @param VISIB  以英里为单位的实时平均可见度, 十分之一, 缺省值:999.9, 单位miles and tenths
    * @param WDSP   平均风速, 十分之一, 缺省值:999.9 单位knots and tenths
    * @param MXSPD  实际最大持续风速, 缺省值:999.9, 单位knots and tenths
    * @param GUST   当天报告的最大阵风, 缺省值:999.9, 单位knots and tenths
    * @param MAX    当天报告的最高温度, 缺省值:9999.9, 单位华氏度 and tenths
    * @param MIN    当天报告的最低温度, 缺省值:9999.9, 单位华氏度 and tenths
    * @param PRCP   实际总降水量, 缺省值:99.9, 单位inches and hundredths
    * @param SNDP   实际积雪厚度, 缺省值:999.9, 单位inches and tenths
    * @param FRSHTT 000000 代表无, 000001 雾天, 000010 雨天或毛毛雨, 000100 下雪或冰粒, 001000 冰雹, 010000 打雷, 100000 龙卷风或漏斗云
    */
  case class Weather(city: String,
                     date: String,
                     TEMP: String,
                     DEWP: String,
                     SLP: String,
                     STP: String,
                     VISIB: String,
                     WDSP: String,
                     MXSPD: String,
                     GUST: String,
                     MAX: String,
                     MIN: String,
                     PRCP: String,
                     SNDP: String,
                     FRSHTT: String
                    )
  val logger = LoggerFactory.getLogger(this.getClass)

  def main(args: Array[String]): Unit = {
    val masterUrl = if (args.length > 0) {
      args.head
    } else {
      "local[2]"
    }
    val conf = new SparkConf().setMaster(masterUrl).setAppName("RealtimeAnalysis")
    // streaming config
    val ssc = new StreamingContext(conf, Seconds(3))
    // kafka config
    val topics = Set("weather")
    val brokers = "localhost:9092"
    val kafkaParams = Map[String, String](
      "metadata.broker.list" -> brokers,
      "key.serializer" -> "kafka.serializer.StringEncoder",
      "value.serializer" -> "kafka.serializer.StringEncoder"
    )
    // redis
    lazy val pool = new JedisPool(new GenericObjectPoolConfig(), "localhost", 6379, 30000)
    val dbIndex = 1
    // kafka streaming
    val kafkaStream = KafkaUtils.createDirectStream[String, String, StringDecoder, StringDecoder](ssc, kafkaParams, topics)

    val streamData = kafkaStream.map { line =>
      val splits = line._2.split(" ").filter { item =>
        item.length() > 0
      }
      Some(Weather(splits(0), splits(1), splits(2), splits(3),
        splits(4), splits(5), splits(6), splits(7), splits(8),
        splits(9), splits(10), splits(11), splits(12), splits(13),
        splits(14)))
    }

    streamData.foreachRDD { rdd =>

      logger.info("第一层**********************")
      rdd.foreachPartition(part => {
        val jedis = MyRedis.pool.getResource
//        下面这种写法会出现连接无法收回的情况, 难道是因为lazy pool的原因?
//        还是序列化的问题呢?
//        val jedis = pool.getResource
        logger.info("第二层**********************")
        part.foreach(data => {
            logger.info("第三层**********************")
            jedis.select(1)
            logger.info(s"### writing into redis with data: ${new Gson().toJson(data.get)}")
            jedis.rpush(data.get.city, new Gson().toJson(data.get))
        })
//        MyRedis.pool.returnResource(jedis)
        jedis.close()
      })
    }
    ssc.start()
    ssc.awaitTermination()

  }
}
