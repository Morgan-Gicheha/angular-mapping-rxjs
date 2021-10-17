import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

export interface PostSchema {
  title: string;
  content: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostSchema) {
    // Send Http request
    this.http
      .post(
        'https://learning-373c6-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(
        () => {
          this.fetchPosts();
        },
        (err) => {
          console.log('something happened');
        },
        () => {
          console.log('sent');
        }
      );
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get('https://learning-373c6-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((responseData) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(
        (posts) => {
          // ...
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        (err) => {
          console.log('something happened on fetch');
        },
        () => {
          console.log('fetch complete');
        }
      );
  }
}
