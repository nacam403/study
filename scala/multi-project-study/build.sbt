lazy val commonSettings = Seq(
  version := "0.1",
  scalaVersion := "2.12.3"
)

lazy val root = (project in file("./"))
  .settings(commonSettings: _*)
  .settings(
    name := "root"
  )
  .aggregate(sub1, sub2, sub3_play)

lazy val sub1 = (project in file("./sub-project-1"))
  .settings(commonSettings: _*)
  .settings(
    name := "sub-project-1"
  )
  .dependsOn(sub2)

lazy val sub2 = (project in file("./sub-project-2"))
  .settings(commonSettings: _*)
  .settings(
    name := "sub-project-2"
  )

lazy val sub3_play = (project in file("./sub-project-3"))
  .settings(commonSettings: _*)
  .settings(
    name := "sub-project-3-play",
    libraryDependencies ++= Seq(
      guice,
      "org.scalatestplus.play" %% "scalatestplus-play" % "3.0.0" % Test,
      "com.h2database" % "h2" % "1.4.194"
    )
  )
  .enablePlugins(PlayScala)
