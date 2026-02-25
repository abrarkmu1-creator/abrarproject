// Update display values when inputs change
document.getElementById('marksInput').addEventListener('change', function() {
    document.getElementById('displayMarks').textContent = this.value;
});

document.getElementById('timeInput').addEventListener('change', function() {
    document.getElementById('displayTime').textContent = this.value;
});

// Drag and drop file upload
const dragDropArea = document.querySelector('.drag-drop-area');
const fileInput = document.getElementById('fileInput');

if (dragDropArea && fileInput) {
    dragDropArea.addEventListener('click', function() {
        fileInput.click();
    });

    dragDropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dragDropArea.style.backgroundColor = '#e8f4f8';
        dragDropArea.style.borderColor = '#007BFF';
    });

    dragDropArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dragDropArea.style.backgroundColor = '#f9f9f9';
        dragDropArea.style.borderColor = '#999';
    });

    dragDropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dragDropArea.style.backgroundColor = '#f9f9f9';
        dragDropArea.style.borderColor = '#999';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            console.log('File dropped:', files[0].name);
            dragDropArea.innerHTML = '<p>✓ File loaded: ' + files[0].name + '</p>';
        }
    });

    fileInput.addEventListener('change', function(e) {
        if (this.files.length > 0) {
            dragDropArea.innerHTML = '<p>✓ File loaded: ' + this.files[0].name + '</p>';
        }
    });
}

// Generate Exam Paper
document.getElementById('generateBtn')?.addEventListener('click', function() {
    const numQuestions = parseInt(document.getElementById('numQuestions').value) || 0;
    const marksInput = document.getElementById('marksInput').value;
    const timeInput = document.getElementById('timeInput').value;
    const paperCodes = document.getElementById('paperCodes').value;

    if (numQuestions <= 0) {
        alert('Please enter number of questions');
        return;
    }

    const examData = {
        questions: numQuestions,
        paperCodes: paperCodes,
        marks: marksInput,
        time: timeInput,
        timestamp: new Date().toLocaleString()
    };

    console.log('Generated Exam:', examData);
    alert(`Exam Paper Generated Successfully!\n\nQuestions: ${numQuestions}\nMarks: ${marksInput}\nTime: ${timeInput} minutes\nPaper Code: ${paperCodes}`);
    
    // Save to localStorage
    localStorage.setItem('lastExamData', JSON.stringify(examData));
});

// Download PDF
document.getElementById('downloadBtn')?.addEventListener('click', function() {
    const lastExamData = localStorage.getItem('lastExamData');
    
    if (!lastExamData) {
        alert('Please generate an exam paper first');
        return;
    }

    const examData = JSON.parse(lastExamData);
    
    // Simple text-based download (in production, use a library like jsPDF)
    const content = `
KHYBER MEDICAL UNIVERSITY PESHAWAR
Exam Paper

Paper Code: ${examData.paperCodes}
Total Questions: ${examData.questions}
Total Marks: ${examData.marks}
Time: ${examData.time} minutes
Generated: ${examData.timestamp}

Questions:
${Array.from({length: examData.questions}, (_, i) => `Q${i+1}: [Question text here]`).join('\n')}

A: Option A    B: Option B    C: Option C    D: Option D
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-paper-${examData.paperCodes}-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    alert('Exam paper downloaded successfully!');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Exam Paper Generator loaded');
    
    // Load saved data if exists
    const lastExamData = localStorage.getItem('lastExamData');
    if (lastExamData) {
        const examData = JSON.parse(lastExamData);
        document.getElementById('numQuestions').value = examData.questions;
        document.getElementById('marksInput').value = examData.marks;
        document.getElementById('timeInput').value = examData.time;
        document.getElementById('paperCodes').value = examData.paperCodes;
    }
});