import axios from "axios";

class Post {
    constructor(){
        this.all_posts = document.querySelector('.post-item .all-posts')
    }
    postItem(posts){
        let postItems = '';
        posts.reverse().map((data) => {
            let { id, name, photo, describe, post} = data;
            postItems += `
            
                    <div class="card my-3 shadow-sm">
                        <div class="card-body">
                            <div class="post-info d-flex justify-content-between">
                                <div class="user-info d-flex align-items-center">
                                    <img src="${photo}" alt="">
                                    <h6>${name}</h6>
                                </div>
                                <button delete_id="${id}" class="delete-btn">Delete</button>
                            </div>
                            <div class="post-content mt-2">
                                <p class="mb-0">${describe}</p>
                                <img class="w-100" src="${post}" alt="">
                            </div>
                        </div>
                    </div>
            
            `
        });
        this.all_posts.innerHTML = postItems;

        document.querySelectorAll('.delete-btn').forEach(item => {
            item.addEventListener('click', (e) => {
                let delete_post = e.target.getAttribute('delete_id')
                this.deletee(delete_post)
            })
        })
    }
    deletee (id){
        axios.delete(`http://localhost:5050/post/${id}`).then(res => {
            this.get_post()
        })
    }
    get_post(){
        axios.get('http://localhost:5050/post').then(res => this.postItem(res.data))
    };
    
}
let post = new Post;
export default post;

