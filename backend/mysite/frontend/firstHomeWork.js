/*
переделал как смог под свой вариант, но моя модель совершенна не такая, просто чтоб подтематику
 */
console.log();
console.log("Про книги");

class Book {
    static books = [];

    constructor(name, numberOfPages, rating) {
        this.name = name;
        this.numberOfPages = numberOfPages;
        this.rating = rating;
        Book.books.push(this);

    }

    numberOfPagesIncrease(newNumberPages) {
        /*
        тут будет менятся количесво страниц на указанное
         */
        this.numberOfPages = newNumberPages;
    }

    ratingIncrease(ratingPlus) {
        /*
        увелечение рейтинга на указанное число
         */
        this.rating += ratingPlus;
    }

    getStatusBook() {
        /*
        тут будет возращаться статус книги по рейтингу
         */
        return ((this.rating > 90) ? "отличная" : (this.rating > 75)
            ? "хорошая" : (this.rating > 60)
                ? "можно почитать" : "не стоит читать")
    }

    static getMaxRating() {
        /*
        тут будет возращаться максимальный рейтинг
         */
        let maxRating = 0;
        for (let i of this.books) {
            if (maxRating < i.rating) {
                maxRating = i.rating;
            }
        }
        return maxRating;
    }

    static filterByScoreBook(scores) {
        /*
        тут будет возращатся список книг выше чем указанный рейтинг
         */
        let namesFilter = [];
        for (let i of this.books) {
            if (i.rating > scores) {
                namesFilter.push(i.name);
            }
        }
        return namesFilter;
    }


}

let book1 = new Book("Труды Математика ", 300, 95);

let book2 = new Book("Механика сплошных сред", 250, 81);
let book3 = new Book("Курс теоритической механики", 451, 61);
let book4 = new Book("Курс по js", 100, 75);

// Максимальный рейтинг книг
console.log(`Максимальный рейтинг среди книг: ${Book.getMaxRating()}`)

// Список книг у которых рейтинг выше указанного
console.log()
console.log(`Рейтинг выше чем указанное количесво у: ${Book.filterByScoreBook(75)}`)


// Статус для чтения у book1
console.log()
console.log(`Статус для чтения у первой книги: ${book1.getStatusBook()}`);

// Статус для чтения у book3
console.log()
console.log(`Статус для чтения у третьей книги: ${book3.getStatusBook()}`);

// тест изменения страниц book1
console.log();
console.log(`Количество страниц у первой книги: ${book1.numberOfPages}`);
book1.numberOfPagesIncrease(310);
console.log(`Новое количество страниц у первой книги: ${book1.numberOfPages}`);
book1.numberOfPagesIncrease(360);
console.log(`Ещё новое количество страниц у первой книги: ${book1.numberOfPages}`);

// тест увелечение рейтинга book1
console.log();
console.log(`Рейтинг у первой книги: ${book1.rating}`);
book1.ratingIncrease(5);
console.log(`Увеличенный рейтинг у первой книги: ${book1.rating}`);
book1.ratingIncrease(5);
console.log(`Ещё раз увеличенный рейтинг у первой книги: ${book1.rating}`);

// Новый статус для чтения у book1
console.log();
console.log(`Новый статус для чтения у первой книги: ${book1.getStatusBook()}`);


/*
Навсякий случай сделал как в домашке написанно
 */
console.log();
console.log("Про студентов");
console.log();

class Student {
    static students = [];

    constructor(name, age, gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
        Student.students.push(this);

    }

    ageIncrease() {
        this.age += 1
    }

    gpaIncrease(ball) {
        this.gpa += ball
    }

    getStatus() {
        return ((this.gpa > 90) ? "отличник" : (this.gpa > 75) ?
            "хорошист" : (this.gpa > 60) ?
            "троечник" : "двоечник")

    }

    static getMaxBall() {
        let maxBall = 0;
        for (let i of this.students) {
            if (maxBall < i.rating) {
                maxBall = i.rating;
            }
        }
        return maxBall;
    }

    static filterByScore(scores) {
        let namesFilter = [];
        for (let i of this.students) {
            if (i.gpa > scores) {
                namesFilter.push(i.name);
            }
        }
        return namesFilter;
    }


}

let student1 = new Student("Ivan", 21, 55);

let student2 = new Student("Sema", 21, 75);
let student3 = new Student("Vova", 22, 67);
let student4 = new Student("Lexa", 25, 90);

// Максимальный средний балл
console.log(`Максимальный средний балл: ${Student.getMaxBall()}`)

// Список студентов у которых средний балл выше указанного
console.log();
console.log(`Средний балл выше чем указанное количесво у: ${Student.filterByScore(60)}`)


// Статус студента1
console.log();
console.log(`Статус студента: ${student1.getStatus()}`);

// тест увелечение возроста студента1
console.log();
console.log(`Возрост: ${student1.age}`);
student1.ageIncrease();
console.log(`Увеличенный возрост: ${student1.age}`);
student1.ageIncrease();
console.log(`Ещё раз увеличенный возрост: ${student1.age}`);

// тест увелечение среднего балла студента1
console.log();
console.log(`Средний балл: ${student1.gpa}`);
student1.gpaIncrease(5);
console.log(`Увеличенный средний балл: ${student1.gpa}`);
student1.gpaIncrease(5);
console.log(`Ещё раз увеличенный средний балл: ${student1.gpa}`);

// Статус студента1
console.log();
console.log(`Новый статус студента: ${student1.getStatus()}`);

