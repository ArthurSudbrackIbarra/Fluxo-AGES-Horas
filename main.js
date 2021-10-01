// Obtendo o elemento botão responsável por inicar/fechar horas.
const openCloseHoursButton = document.querySelector("form button");

// Função responsável por abrir e fechar as horas automaticamente.
function start(info) {
    showInfoMessages();

    // Clica no botão e começa horas. 
    openCloseHoursButton.click();

    // Após decorrido o tempo informado, aciona o alarme, clica no botão e fecha as horas.
    const initialTime = Date.now(); 
    const finalTime = initialTime + (info.hours * 3600000) + (info.minutes * 60000) + (info.seconds * 1000);

    const timeCounting = setInterval(() => {
        const currentTime = Date.now(); 
        if(currentTime >= finalTime) {
            clearInterval(timeCounting);
            if(openCloseHoursButton.hasAttribute("disabled")) {
                showErrorMessages();
            } else {
                openCloseHoursButton.click();
                showSuccessMessages();
            }       
            playAlarm();
        }
    }, 100);
}

// Função responsável por tocar o áudio do alarme.
function playAlarm() {
    new Audio("http://belltimers.com/soundfiles/EvacuationWhoopgrp3_tone1.mp3").play();
}

// Mostra mensagens de informação.
function showInfoMessages() {
    console.warn("Não se esqueça de preencher o campo do que foi feito ou as suas horas não poderão ser fechadas!");
    console.log("As suas horas foram iniciadas, " + sessionStorage.getItem("name") + "!");
}
// Mostra mensagens de erro.
function showErrorMessages() {
    const errorMessage = "Você digitou muito pouco ou nada no campo do que foi feito e suas horas não puderam ser fechadas!";
    console.error(errorMessage);
    alert(errorMessage);
}
// Mostra mensagens de sucesso.
function showSuccessMessages() {
    const successMessage = "Horas concluídas com sucesso!";
    console.log(successMessage);
    alert(successMessage);
}

// Objeto contendo as informações do tempo.
const info = {
    hours: 1, // Altere o 1 para as horas desejadas.
    minutes: 40, // Altere o 40 para os minutos desejados.
    seconds: 50, // Altere o 50 para os segundos desejados.

    // OBS: O tempo informado não será rigidamente preciso, mas sim uma aproximação.
};

// Aciona a função 'start' e começa a contar as horas.
start(info);