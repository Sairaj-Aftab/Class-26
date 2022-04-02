import 'boxicons/css/boxicons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../src/main.scss'
import '../src/index.css';
import axios, { Axios } from 'axios';
import sairaj from '../src/img/sairaj.jpg'
import Post from './components/Post';
import Alert from './components/Alert';

const post_img = document.querySelector('.post-box img');
post_img.setAttribute('src', sairaj);

// DOM Loading Operations
document.addEventListener('DOMContentLoaded', getPost)

// Form Post to JSON
document.querySelector('.modal .form-area').addEventListener('submit', setPost)
const msg = document.querySelector('.modal p')

function getPost () {
    axios.get('http://localhost:5050/post').then(res => Post.postItem(res.data))
};
getPost();
// Set Post to JSON from the Form
function setPost(e){
    e.preventDefault()
    
    let formData = new FormData(e.target)
    let allData = Object.fromEntries(formData.entries())

    if (allData.name == '' || allData.photo == '' || allData.describe == '') {
        msg.innerHTML = Alert.danger('Please fill all fields')
    } else {
        axios.post('http://localhost:5050/post', {
            name : allData.name,
            photo : allData.photo,
            describe : allData.describe,
            post : allData.post
        }).then(res => {
            getPost()
            msg.innerHTML = Alert.success('Successfully Created')
        })
    }
}