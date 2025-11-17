// 1 DATA 
let comments1 = [];
let ratings1 = [];
let currentRating1 = 0;

//  2 DATA 
let comments2 = [];
let ratings2 = [];
let currentRating2 = 0;



// ============================================
// STAR CLICK SETUP
// ============================================
function setupStars(articleId) {

    let starsBox = document.getElementById("stars" + articleId);

    starsBox.querySelectorAll(".star").forEach(star => {

        star.addEventListener("click", function() {

            let value = this.getAttribute("data-value");

            if(articleId === 1){
                currentRating1 = value;
            } else {
                currentRating2 = value;
            }

            document.getElementById("selectedRating" + articleId).textContent = value;

            
            starsBox.querySelectorAll(".star").forEach(s => s.classList.remove("selected"));

           
            this.classList.add("selected");
        });
    });
}

setupStars(1);
setupStars(2);



function submitComment(articleId){

    
    let name = document.getElementById("name" + articleId).value.trim();
    let email = document.getElementById("email" + articleId).value.trim();
    let text = document.getElementById("comment" + articleId).value.trim();

   
    let nameErr = document.getElementById("nameError" + articleId);
    let emailErr = document.getElementById("emailError" + articleId);
    let commentErr = document.getElementById("commentError" + articleId);

   
    nameErr.innerHTML = "";
    emailErr.innerHTML = "";
    commentErr.innerHTML = "";



   
    
    // Name Valid
    if(name.length < 2 || name.length > 50){
        nameErr.innerHTML = "Name should be between 2 and 50 characters";
        return;
    }

    // Email Valid
    if(email !== "" && !email.includes("@")){
        emailErr.innerHTML = "Please enter a valid email address";
        return;
    }

    // Comment Valid
    if(text.length < 10 || text.length > 500){
        commentErr.innerHTML = "Comment should between 10 and 500 characters";
        return;
    }




    if(articleId === 1){
        comments1.push({ name, email, text, rating: currentRating1 });

        if(currentRating1 > 0){
            ratings1.push(parseInt(currentRating1));
        }
    } 
    else {
        comments2.push({ name, email, text, rating: currentRating2 });

        if(currentRating2 > 0){
            ratings2.push(parseInt(currentRating2));
        }
    }



    // update 
    updateStats(articleId);
    displayComments(articleId);


    // reset 
    document.getElementById("name" + articleId).value = "";
    document.getElementById("email" + articleId).value = "";
    document.getElementById("comment" + articleId).value = "";

    // reset rating
    if(articleId === 1){
        currentRating1 = 0;
    } else {
        currentRating2 = 0;
    }

    document.getElementById("selectedRating" + articleId).textContent = "0";

    // reset star highlight
    document.getElementById("stars" + articleId)
        .querySelectorAll(".star").forEach(s => s.classList.remove("selected"));
}



function updateStats(articleId){

    if(articleId === 1){

        document.getElementById("totalComments1").textContent = comments1.length;

        if(ratings1.length > 0){
            let avg = (ratings1.reduce((a,b) => a + b) / ratings1.length).toFixed(1);
            document.getElementById("avgRating1").textContent = avg;
        } else {
            document.getElementById("avgRating1").textContent = "0";
        }
    }

    else {

        document.getElementById("totalComments2").textContent = comments2.length;

        if(ratings2.length > 0){
            let avg = (ratings2.reduce((a,b) => a + b) / ratings2.length).toFixed(1);
            document.getElementById("avgRating2").textContent = avg;
        } else {
            document.getElementById("avgRating2").textContent = "0";
        }
    }
}



function displayComments(articleId){

    let container = document.getElementById("commentList" + articleId);
    container.innerHTML = "";

    let data = (articleId === 1) ? comments1 : comments2;

    data.forEach(c => {
        let box = document.createElement("div");
        box.className = "comment-item";

        box.innerHTML = `
            <p><b>${c.name}</b> (${c.email})</p>
            <p>${c.text}</p>
            <p>Rating: ${c.rating}</p>
        `;

        container.appendChild(box);
    });
}
