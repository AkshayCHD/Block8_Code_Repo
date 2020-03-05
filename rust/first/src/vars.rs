pub fn run() {
    let x;
    let hello = String::from("hello");
    x = 11;
    let face = '\u{1F600}';
    let mut temp_string = String::with_capacity(1);
    temp_string.push('a');
    temp_string.push('a');
    temp_string.push('a');
    temp_string.push('a');
    temp_string.push('a');
    temp_string.push('a');
    
    println!("the value of x is {}", x);
    println!("the max value of i32 is {}", std::i32::MAX);
    println!("the max value of i32 is {}", std::i64::MAX);
    println!("the max value of i32 is {}", std::i128::MAX);
    println!("this is the hello string {}", hello);
    println!("this is the temp string {}", temp_string);
    println!("{}", face);
}