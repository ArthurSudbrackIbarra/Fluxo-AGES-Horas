// Chave a procurar no localStorage.
const FINAL_TIME_FIELD = "final-time";

// Obtendo o elemento botão responsável por inicar/fechar horas.
const openCloseHoursButton = document.querySelector("form button");

// Função responsável por abrir e fechar as horas automaticamente.
function start(info) {
    // O horário em que as horas devem fechar.
    let finalTime;

    // Busca em localStorage o horário em que as horas devem fechar.
    const localStorageFinalTime = localStorage.getItem(FINAL_TIME_FIELD);

    // Se o resultado buscado não é nulo, usa o tempo que estava salvo em localStorage,
    // caso o contrário, usa o tempo informado no objeto 'info'.
    if (localStorageFinalTime) {
        finalTime = parseInt(localStorageFinalTime);
        showInfoMessages("continuadas");
    } else {
        finalTime = Date.now() + (info.hours * 3600000) + (info.minutes * 60000) + (info.seconds * 1000);
        showInfoMessages("iniciadas");

        // Clica no botão e começa a contar as horas.
        openCloseHoursButton.click();
    }

    // Antes de recarregar a página, salva em localStorage o tempo restante para fechar as horas.
    window.onbeforeunload = () => {
        localStorage.setItem(FINAL_TIME_FIELD, finalTime.toString());
    }

    // Após decorrido o tempo informado, aciona o alarme, clica no botão e fecha as horas.
    const timeCounting = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime >= finalTime) {
            clearInterval(timeCounting);
            localStorage.removeItem(FINAL_TIME_FIELD);
            playAlarm();
            if(openCloseHoursButton.hasAttribute("disabled")) {
                setTimeout(() => {
                    showErrorMessages();
                }, 5000);
            } else {
                openCloseHoursButton.click();
                showSuccessMessages();
            }       
        }
    }, 100);
}

// Função responsável por tocar o áudio do alarme.
function playAlarm() {
    new Audio("http://belltimers.com/soundfiles/EvacuationWhoopgrp3_tone1.mp3").play();
}

// Mostra mensagens de informação.
function showInfoMessages(verb) {
    console.warn("Não se esqueça de preencher o campo do que foi feito ou as suas horas não poderão ser fechadas!");
    console.log(`As suas horas foram ${verb}, ${sessionStorage.getItem("name")}!`);
}
// Mostra mensagens de erro.
function showErrorMessages() {
    const errorMessage = "Você digitou muito pouco ou nada no campo do que foi feito e suas horas não puderam ser fechadas!";
    console.error(errorMessage);
    alert(errorMessage);
}
// Mostra a mensagem de sucesso.
function showSuccessMessages() {
    console.log("Horas concluídas com sucesso!");
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

// Se a página foi recarregada após a contagem já ter sido iniciada,
// será usado o horário de fechamento das horas original, antes da página ser recarregada.