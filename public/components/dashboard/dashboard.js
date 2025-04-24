function calcularIdade(dataNascimentoStr) {
    const partes = dataNascimentoStr.split("-");
    const ano = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const dia = parseInt(partes[2]);
  
    const hoje = new Date();
    let idade = hoje.getFullYear() - ano;
  
    // Ajusta se ainda não fez aniversário esse ano
    if (
      hoje.getMonth() + 1 < mes || 
      (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)
    ) {
      idade--;
    }
  
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  
    return `${dataFormatada} - ${idade} anos`;
}
  

document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("userData"));
    $(".user-container span").text(userData.name.split(" ")[0]);
    $(".user-infos .infos #contact").text(userData.tel);
    $(".user-infos .infos #name").text(userData.name);
    $(".user-infos .infos #Birthdate").text(calcularIdade(userData.birthdate));
});

document.querySelectorAll('nav .buttons button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove "active" class from all buttons
        document.querySelectorAll('nav .buttons button').forEach(btn => btn.classList.remove('active'));
        // Add "active" class to the clicked button
        button.classList.add('active');
        $('.page').removeClass('active');
        
        // Get the target page from the button's data attribute
        const targetPage = button.getAttribute('data-page');
        // Show the target page and hide all others
        $(`.${targetPage}-page`).addClass('active');
    });
});

document.querySelectorAll('.service-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove "active" class from all buttons
        document.querySelectorAll('.service-buttons button').forEach(btn => btn.classList.remove('active'));
        // Add "active" class to the clicked button
        button.classList.add('active');

        $('.page').removeClass('active');
        // Get the target page from the button's data attribute
        const targetPage = button.getAttribute('data-page');
        // Show the target page and hide all others
        $(`.${targetPage}-page`).addClass('active');

        var glide = new Glide(`#${targetPage}-glide`, {
            type: 'carousel',
            focusAt: 'center',
            startAt: 0,
            perView: 3,
        })
    
        glide.mount()
    });
});

document.querySelectorAll('nav .togglenav').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector("nav").classList.toggle('active');
    });
});
$('.back-to-menu').on('click', function() {
    window.location.href = "../../index.html";
});


