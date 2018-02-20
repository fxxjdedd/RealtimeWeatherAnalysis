name := "weather"

version := "1.0"

scalaVersion := "2.11.12"

libraryDependencies ++= Seq(
  "org.apache.hadoop"%"hadoop-common"%"2.7.5"%"provided",
  "org.apache.kafka"%"kafka_2.11"%"1.0.0"%"provided",
  "org.apache.spark"%"spark-core_2.11"%"2.2.1"%"provided",
  "org.apache.spark"%"spark-streaming_2.11"%"2.2.1"%"provided", // 运行jar的容器有spark相关的lib
  "org.apache.spark"%"spark-streaming-kafka_2.11"%"1.6.3",
  "redis.clients"%"jedis"%"2.9.0",// 不能是provided,因为运行jar的容器不会有jedis
  "com.google.code.gson"%"gson"%"2.8.0"
)


