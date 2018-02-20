// put this at the top of the file
import AssemblyKeys._

assemblySettings

// 这个是打包之后jar包的名字
jarName in assembly := "weather.jar"

// 这个作用是在打包的时候，跳过测试
test in assembly := {}

mergeStrategy in assembly := {
  case m if m.toLowerCase.endsWith("manifest.mf")          => MergeStrategy.discard
  case m if m.toLowerCase.matches("meta-inf.*\\.sf$")      => MergeStrategy.discard
  case "log4j.properties"                                  => MergeStrategy.discard
  case m if m.toLowerCase.startsWith("meta-inf/services/") => MergeStrategy.filterDistinctLines
  case "reference.conf"                                    => MergeStrategy.concat
  case _                                                   => MergeStrategy.first
}