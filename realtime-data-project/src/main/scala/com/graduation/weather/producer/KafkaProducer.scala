package com.graduation.weather.producer

import java.util.Properties

import org.slf4j.LoggerFactory
import com.graduation.weather.utils.HdfsUtils
import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.FileSystem
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerConfig, ProducerRecord, RecordMetadata}
import org.apache.kafka.common.serialization.StringSerializer

import scala.collection.mutable.ListBuffer
import scala.util.{Failure, Success, Try}

/**
  * Created by apple on 2018/2/17.
  */
object KafkaProducer {

  val logger = LoggerFactory.getLogger(this.getClass)
  //设想在阿里云上运行
  val brokers = "localhost:9092"
  val topic = "weather"
  val jinan = "548230-99999"
  def main(args: Array[String]): Unit = {

    val props = new Properties()
    props.put("metadata.broker.list", brokers)
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, brokers)
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getName)
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getName)

    val producer = new KafkaProducer[String, String](props)
    val fileSystem : FileSystem = FileSystem.get(new Configuration)
    val years = HdfsUtils.listPath(fileSystem, "/root/clouddata")
    years.foreach { yearPath =>
      val yearReg = """.*\/(.*)""".r
      val yearReg(year) = yearPath
      val reader = Try(HdfsUtils.readGZFile(fileSystem, s"/root/clouddata/$year/$jinan-$year.op.gz"))
      reader match {
        case Success(r) =>
          // 一行是一天
          val lines = Stream.continually(r.readLine()).takeWhile(_ != null)
          lines.toArray.slice(1, lines.length).foreach { line =>
            logger.info(s"### sending kafka msg ###")
            producer.send(new ProducerRecord(topic, line))
            logger.info(s"### sent kafka msg: $line ###")
            Thread.sleep(3000)
          }
        case Failure(f) =>
          logger.warn(s"### year: $year 获取BufferdReader失败###");
          f.printStackTrace()
      }
    }
    fileSystem.close()
  }
}
