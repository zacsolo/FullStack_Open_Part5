describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: 'Ronald',
      username: 'FakeUser',
      password: 'password1',
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user);
    cy.visit('http://localhost:3001');
  });

  it('Login page loads as default', function () {
    cy.contains('Sign In To Acces Your Blog Posts');
  });

  it('login success with correct password', function () {
    cy.visit('http://localhost:3001');

    cy.get('#username').type('FakeUser');
    cy.get('#password').type('password1');
    cy.get('#login-button').click();

    cy.contains('Welcome Ronald');
  });

  it('login fails with wrong password', function () {
    cy.visit('http://localhost:3001');
    cy.contains('Login').click();
    cy.get('#username').type('Ronald');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.contains('Wrong username or password');
    cy.get('html').should('not.contain', 'Welcome Ronald');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'FakeUser', password: 'password1' });
    });

    it('a new note can be created', function () {
      cy.createBlog({
        title: 'A Blog Title',
        author: 'A Fake Author',
        url: 'www.blog.com',
      });

      cy.contains('A Blog Title');
      cy.contains('A Fake Author');
    });

    it('a new note can be liked', function () {
      cy.createBlog({
        title: 'A Blog Title',
        author: 'A Fake Author',
        url: 'www.blog.com',
      });
      cy.contains('view').click();
      cy.contains('like').click();
      cy.contains('Likes: ').should('contain', 1);
    });

    it('post can be deleted', function () {
      cy.createBlog({
        title: 'A Blog Title',
        author: 'A Fake Author',
        url: 'www.blog.com',
      });
      cy.contains('view').click();
      cy.contains('Delete Post').click();
    });

    it.only('post can be deleted', function () {
      cy.createBlog({
        title: 'A Blog Title',
        author: 'A Fake Author',
        url: 'www.blog.com',
      });
      cy.contains('view').click();
      cy.contains('like').click().click();
      cy.contains('Likes: ').should('contain', 2);

      cy.createBlog({
        title: 'Second Blog Title',
        author: 'James Gilroy',
        url: 'www.url.com',
      });
      cy.contains('view').click();
      cy.contains('Likes: 0')
        .contains('like')
        .click()
        .click()
        .click()
        .wait(1000);
      cy.get('h4').first().contains('Second Blog Title');
    });
  });
});
