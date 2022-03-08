const tests = [
    require("./test_begin_block"),
    require("./test_bultins"),
    require("./test_self_eval_expressions"),
    require("./test_var"),
    require("./test_if_statement"),
    require("./test_while_statement"),
    require("./test_user_defined_functions"),
    require("./test_lambda_functions"),
    require("./test_switch_statement"),
    require("./test_for_statement"),
    require("./test_math_operators"),
    require("./test_class"),
    require("./test_module"),
    require("./test_import"),
];

tests.forEach(test => {
    test();
});

console.info("All tests passed.")
