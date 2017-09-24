lazy val commonSettings = Seq(
  version := "0.1",
  scalaVersion := "2.12.3"
)

lazy val root = (project in file("./"))
  .settings(commonSettings: _*)
  .settings(
    name := "multi-project-study",
  )
  .aggregate(sub1, sub2)

lazy val sub1 = (project in file("./sub-project-1"))
  .settings(commonSettings: _*)
  .settings(
    name := "sub-project-1",
  )
  .dependsOn(sub2)

lazy val sub2 = (project in file("./sub-project-2"))
  .settings(commonSettings: _*)
  .settings(
    name := "sub-project-2",
  )
