function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/a7d3cb0343ca4d66af5b85c822956532/appointmentdata",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    event.target.username.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/a7d3cb0343ca4d66af5b85c822956532/appointmentdata")
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          displayUserOnScreen(res.data[i]);
        }
      })
      .catch((error) => console.log(error));
  });
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      userList.removeChild(userItem);
      axios
        .delete(`https://crudcrud.com/api/a7d3cb0343ca4d66af5b85c822956532/appointmentdata/${userDetails._id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  
    editBtn.addEventListener("click", function (event) {
        userList.removeChild(editBtn.parentElement);
       // localStorage.removeItem(userDetails.email);
       axios
        .delete(`https://crudcrud.com/api/a7d3cb0343ca4d66af5b85c822956532/appointmentdata/${userDetails._id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
      });
  }
  