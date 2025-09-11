function Student(firstName,lastName,age,score){
    this.firstName=firstName;
    this.lastName= lastName;
    this.age=age;
    this.score=score
    this.getFullName = function(){
        return this.firstName+" "+this.lastName
    }
}
let student1 = new Student("nguyen","Tung",18,8.0);
let student2 = new Student("nguyen","Toan",19,8.5);
let student3 = new Student("nguyen","Tien",20,9.0);