'use strict';


angular.module('fmgApp')
  .controller('BlogCtrl', function ($scope, blogService, commentService, Auth, toaster) {
    $scope.blogs = [];
    $scope.comments = [];
    $scope.limit = 5;
    $scope.message = 'Hello';
    $scope.viewAll = true;
    $scope.edit = false;
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.currentUser = Auth.getCurrentUser();
    console.log($scope.isAdmin);

    blogService.getAllPosts().then(function(response) {
        console.log(response);
        $scope.blogs = response.data;
    });

    $scope.updateBlogs = function() {
        blogService.getAllPosts().then(function(response) {
            console.log(response);
            $scope.blogs = response.data;
        });
    };

    $scope.incrementLimit = function() {
        $scope.limit+=5;
    };

    $scope.editPost = function() {
        $scope.edit = !$scope.edit;
    };
    $scope.submitEdit= function() {
        $scope.currentBlog.updatedAt = moment().format('MMMM Do YYYY h:mm:ss a');

        blogService.editPost($scope.currentBlog).then(function(response) {
            console.log(response);
            $scope.updateBlogs();
            $scope.edit = false;
        });
    };

    $scope.deletePost = function(blog) {
        blogService.deletePost(blog).then(function(response) {
            console.log(response);
            $scope.updateBlogs();
        });
    };

    $scope.toggleView = function(blog) {
        $scope.currentBlog = blog;
        $scope.viewAll = ! $scope.viewAll;
    };

    $scope.resetView = function() {
        $scope.viewAll = true;
        $scope.edit = false;
    };

    $scope.saveDraft = function() {
        console.log('save draft');
    };

    $scope.createPost = function() {
        $scope.blogpost.published = true;
        $scope.blogpost.createdAt = moment().format('MMMM Do YYYY h:mm:ss a');
        $scope.blogpost.updatedAt = moment().format('MMMM Do YYYY h:mm:ss a');
        blogService.createPost($scope.blogpost).then(function(response) {
            $scope.blogpost.title='';
            $scope.blogpost.body='';
            console.log(response);
            $scope.updateBlogs();
        });
    };

    $scope.saveDraft = function() {
        $scope.blogpost.published = false;
        $scope.blogpost.createdAt = moment().format('MMMM Do YYYY h:mm:ss a');
        $scope.blogpost.updatedAt = moment().format('MMMM Do YYYY h:mm:ss a');
        blogService.createPost($scope.blogpost).then(function(response) {
            $scope.blogpost.title='';
            $scope.blogpost.body='';
            console.log(response);
            $scope.updateBlogs();
        });
    };

    commentService.getAllComments()
      .then(function(response){
        $scope.comments = response.data;
      }).catch(function(err){
        console.log(err);
    });

    $scope.updateComments = function() {
        commentService.getAllComments()
          .then(function(response){
            $scope.comments = response.data;
          }).catch(function(err){
            console.log(err);
        });
    };

    $scope.createComment= function (){
      var text = $scope.comment.text;

      if (text === ''){
         toaster.pop('error','Please enter text.');
         return;
      }

      var commentToCreate = {
        blogId: $scope.currentBlog._id,
        userId: $scope.currentUser._id,
        body: text
      };

      commentService.createComment(commentToCreate)
        .then(function (response){
          var comment = response.data;
          //toaster.pop('success','Comment submitted');
          $scope.comment.text = '';
          console.log(comment);
          $scope.comments.push(comment);
        }).catch(function(err){
          console.log(err);
        });
    };

    $scope.deleteComment = function(comment) {
        commentService.deleteComment(comment).then(function() {
            $scope.updateComments();
        });
    };

    $scope.numComments = function(blogpost) {
        var numComments = 0;
        for(var i = 0; i < $scope.comments.length; i++) {
            if($scope.comments[i].blogId === blogpost._id) {
                numComments++;
            }
        }
        return numComments;
    };

    $scope.togglePublished = function(blogpost) {
        blogService.togglePublished(blogpost).then(function(res) {
            console.log('published toggled');
            $scope.updateBlogs();
        });
    };
  });
