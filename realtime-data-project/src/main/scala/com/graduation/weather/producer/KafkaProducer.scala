package com.graduation.weather.producer

import java.util.Properties
import java.util.concurrent.{ExecutorService, Executors}

import org.slf4j.LoggerFactory
import com.graduation.weather.utils.HdfsUtils
import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.FileSystem
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerConfig, ProducerRecord, RecordMetadata}
import org.apache.kafka.common.serialization.StringSerializer

import scala.concurrent.duration.Duration.Inf
import scala.collection.mutable.{ArrayBuffer, ListBuffer}
import scala.util.{Failure, Success, Try}
import scala.concurrent._
import ExecutionContext.Implicits.global

/**
  * Created by apple on 2018/2/17.
  */
object KafkaProducer {

  val logger = LoggerFactory.getLogger(this.getClass)
  //设想在阿里云上运行
  val brokers = "localhost:9092"
  val topic = "weather"
  val cities = Array(
    ("548230-99999", "济南"),
    //    ("547630-99999", "青岛"),
    //    ("548230-99999", "淄博"),
    //    ("548230-99999", "枣庄"),
    //    ("548230-99999", "东营"),
    ("548430-99999", "烟台"),
    ("548430-99999", "潍坊"),
    ("534800-99999", "济宁"),
    ("588530-99999", "泰安"),
    ("547740-99999", "威海"),
    ("549450-99999", "日照"),
    //    ("548230-99999", "莱芜"),
    //    ("548230-99999", "滨州"),
    ("547140-99999", "德州"),
    //    ("548230-99999", "聊城"),
    ("549380-99999", "临沂"),
    ("549060-99999", "菏泽")
  )

  def runTask(city: (String, String)): Boolean = {
    val props = new Properties()
    props.put("metadata.broker.list", brokers)
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, brokers)
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getName)
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getName)

    val producer = new KafkaProducer[String, String](props)
    val fileSystem: FileSystem = FileSystem.get(new Configuration)
    val years = HdfsUtils.listPath(fileSystem, "/root/clouddata")
    years.foreach { yearPath =>
      val yearReg = """.*\/(.*)""".r
      val yearReg(year) = yearPath
      val reader = Try(HdfsUtils.readGZFile(fileSystem, s"/root/clouddata/$year/${city._1}-$year.op.gz"))
      reader match {
        case Success(r) =>
          // 一行是一天
          var lines = Stream.continually(r.readLine()).takeWhile(_ != null)
          lines.toArray.slice(1, lines.length).foreach { line =>
            logger.info(s"### sending kafka msg $city ###")
            val newline = line.replace(city._1.replace("-", " "), city._2)
            producer.send(new ProducerRecord(topic, newline))
            logger.info(s"### sent kafka msg: $newline ###")
            Thread.sleep(3000)
          }
        case Failure(f) =>
          logger.warn(s"### year: $year-$city 获取BufferdReader失败###");
          f.printStackTrace()
      }

    }
    fileSystem.close()
    true
  }

  class ThreadTask(city: (String, String)) extends Runnable{
    override def run(){
      runTask(city)
    }
  }

  def main(args: Array[String]): Unit = {
  
    val threadPool:ExecutorService=Executors.newFixedThreadPool(20)
    try {
      //提交5个线程
      cities.foreach { city =>
        threadPool.execute(new ThreadTask(city))
      }

    }finally {
      threadPool.shutdown()
    }

  }
}
