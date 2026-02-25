let questionCount = 1;
document.getElementById('addQuestion').addEventListener('click', function() {
    questionCount++;
    const questionsDiv = document.getElementById('questions');
    const newQuestion = document.createElement('div');
    newQuestion.className = 'questionField';
    newQuestion.innerHTML = `<label for="question${questionCount}">Question ${questionCount}:</label><input type="text" id="question${questionCount}" name="question${questionCount}" required><br><br>`;
    questionsDiv.appendChild(newQuestion);
});

document.getElementById('examForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        paperCode: document.getElementById('paperCode').value,
        marks: document.getElementById('marks').value,
        time: document.getElementById('time').value,
        questions: []
    };
    for (let i = 1; i <= questionCount; i++) {
        const questionInput = document.getElementById(`question${i}`);
        if (questionInput && questionInput.value) {
            formData.questions.push(questionInput.value);
        }
    }
    console.log('Form Data:', formData);
    alert('Exam paper generated successfully!');
});

const fileUpload = document.getElementById('fileUpload');
const dropZone = document.querySelector('body');
dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.style.backgroundColor = '#f0f0f0';
});
dropZone.addEventListener('dragleave', function() {
    dropZone.style.backgroundColor = '';
});
dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZone.style.backgroundColor = '';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileUpload.files = files;
        console.log('File uploaded:', files[0].name);
    }
});