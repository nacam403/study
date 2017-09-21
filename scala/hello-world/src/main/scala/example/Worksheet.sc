val (x, y, z) = (1, 2, 3)

var s = "aaa"
s = "bbb"

def addOne(x: Int): Int = x + 1
addOne(10)

val plusOne = (x: Int) => x + 1
val a = plusOne(100)

def adder(x: Int, y: Int): Int = x + y
val addThree = adder(3, _: Int)
val b = addThree(10)
val curriedAdder = (adder(_, _)).curried
val addTwo = curriedAdder(2)
val b2 = addTwo(5)

def multiply(x: Int)(y: Int): Int = x * y
val timesTwo = multiply(2)(_)
val c = timesTwo(100)

class Calculator(brand: String) {
  var color: String = if (brand == "HP") {
    "black"
  } else {
    "white"
  }

  def this() {
    this(null)
  }

  def add(x: Int, y: Int) = x + y
}

val hpCalc = new Calculator
hpCalc.add(3, 4)
hpCalc.color

class ScientificCalculator(brand: String) extends Calculator(brand) {
  def add(x: Double, y: Double) = x + y
}
val scCalc = new ScientificCalculator("HP")
scCalc.add(3.3, 2.2)
scCalc.color

trait Car {
  val brand: String
}

class BMW extends Car {
  val brand = "BMW"
}

trait Cache[K, V] {
  def get(key: K): V
  def put(key: K, value: V)
  def delete(key: K)
}

val one: PartialFunction[Int, String] = {case 1 => "one"}
one.isDefinedAt(1)
one(1)
val result2 = one(2)
