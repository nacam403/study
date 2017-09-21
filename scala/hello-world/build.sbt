name := "hello-world"

version := "1.0"

scalaVersion := "2.12.3"

scalacOptions ++= Seq("-deprecation", "-feature", "-unchecked", "-Xlint")

libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.1" % "test"
