const rules = document.getElementById('rules');
const openRules = document.getElementById('openRules');
const closeRules = document.getElementById('closeRules');



openRules.addEventListener('click', () => {
    rules.showModal();
})

closeRules.addEventListener('click', () => {
    rules.close();
})