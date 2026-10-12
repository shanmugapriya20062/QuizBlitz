package com.example.demo;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
public class QuizController {

    @GetMapping("/api/hello")
    public String hello() {
        return "QuizBlitz Java Backend is working!";
    }

    private Map<String, Object> question(
            String question, List<String> options, String answer) {
        return Map.of(
                "question", question,
                "options", options,
                "answer", answer
        );
    }

    @GetMapping("/api/questions")
    public Map<String, List<Map<String, Object>>> getQuestions() {
        return Map.of(
            "HTML", List.of(
                question("What does HTML stand for?",
                    List.of("Hyper Text Markup Language", "High Text Machine Language",
                            "Home Tool Markup Language", "Hyperlinks Text Mark Language"),
                    "Hyper Text Markup Language"),
                question("Which tag creates a paragraph?",
                    List.of("<p>", "<h1>", "<br>", "<div>"), "<p>"),
                question("Which tag inserts an image?",
                    List.of("<image>", "<img>", "<picture>", "<src>"), "<img>"),
                question("Which tag creates a hyperlink?",
                    List.of("<link>", "<a>", "<href>", "<url>"), "<a>"),
                question("Which tag creates an unordered list?",
                    List.of("<ol>", "<li>", "<ul>", "<list>"), "<ul>")
            ),

            "CSS", List.of(
                question("Which language styles a web page?",
                    List.of("HTML", "CSS", "Java", "SQL"), "CSS"),
                question("Which property changes text color?",
                    List.of("font-style", "background", "color", "text-size"), "color"),
                question("Which symbol selects a class in CSS?",
                    List.of("#", ".", "*", "@"), "."),
                question("Which property changes the background color?",
                    List.of("background-color", "font-color", "text-style", "border-style"),
                    "background-color"),
                question("Which property adds space inside an element?",
                    List.of("margin", "padding", "outline", "display"), "padding")
            ),

            "JavaScript", List.of(
                question("Which keyword declares a variable in JavaScript?",
                    List.of("int", "String", "let", "class"), "let"),
                question("Which symbol checks strict equality?",
                    List.of("=", "==", "===", "!="), "==="),
                question("Which function displays a message in the console?",
                    List.of("print()", "console.log()", "show()", "display()"),
                    "console.log()"),
                question("Which method selects an element by its ID?",
                    List.of("getElementById()", "getClass()", "queryID()", "selectId()"),
                    "getElementById()"),
                question("Which keyword defines a constant?",
                    List.of("let", "var", "const", "fixed"), "const")
            ),

            "Java", List.of(
                question("Which keyword creates a class in Java?",
                    List.of("define", "class", "create", "newclass"), "class"),
                question("Which method starts a Java application?",
                    List.of("start()", "run()", "main()", "init()"), "main()"),
                question("Which company originally developed Java?",
                    List.of("Microsoft", "Sun Microsystems", "Google", "IBM"),
                    "Sun Microsystems"),
                question("Which data type stores whole numbers?",
                    List.of("double", "boolean", "int", "char"), "int"),
                question("Which keyword creates an object?",
                    List.of("class", "this", "new", "void"), "new")
            )
        );
    }
}