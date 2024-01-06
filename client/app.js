document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("registerForm");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        
        
        const formDataObject = {};

        for (const [key, value] of formData.entries()) {
            formDataObject[`${key}`] = value;
        }
 
        
        fetch("/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formDataObject),
        })
        .then(response => response.json())
        .catch(error => {
            console.error("Error", error);
        });
    });
});