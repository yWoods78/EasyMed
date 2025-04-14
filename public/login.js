$("#cpf").mask("000.000.000-00");
$("#user").mask("000.000.000-00");
$("#tel").mask("(00) 0 0000-0000");


$(document).on("click", ".finish", function (e) {
    e.preventDefault(); // impede o comportamento padrão do botão
    const userData = {
        cpf: $("#cpf").val(),
        name: $("#name").val(),
        birthdate: $("#birthdate").val(),
        pass: $("#sign-pass").val(),
        tel: $("#tel").val()
    };

    $.ajax({
        url: "http://localhost:3000/CadastrarUsuario",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function (response) {
            console.log("Usuário cadastrado com sucesso:", response);
            alert("Cadastro realizado com sucesso!");
        },
        error: function (xhr, status, error) {
            console.error("Erro no cadastro:", error);
            alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
        }
    });
});

$(document).on("click", ".join", function (e) {
    e.preventDefault();

    const userData = {
        cpf: $("#user").val(),
        senha: $("#pass").val(),
    };

    $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function (response) {
            console.log("Login bem-sucedido:", response);
            alert("Login realizado com sucesso!");
            // Redirecionar para outra página se quiser
            // window.location.href = "painel.html";
        },
        error: function (xhr, status, error) {
            console.error("Erro no login:", error);
            alert("Erro ao fazer login. Verifique o CPF e a senha.");
        }
    });
});
