const context = {
    username: 'MyUserName',
    login:{
        title: 'Вход',
        inputs: [
            {name:'login', placeholder:'Логин', type:'text'},
            {name:'password', placeholder:'Пароль', type:'password'}
        ],
        buttons: [
            {text:'Войти'},
            {text:'Зарегистрироваться', link: '../register/register.html'},
        ]
      
    },
    register:{
        title: 'Регистрация',
        inputs: [
            {name:'email', placeholder:'Почта', type:'email'},
            {name:'login', placeholder:'Логин', type:'text'},
            {name:'first_name', placeholder:'Имя', type:'text'},
            {name:'second_name', placeholder:'Фамилия', type:'text'},
            {name:'phone', placeholder:'Телефон', type:'tel'},
            {name:'password', placeholder:'Пароль', type:'password'},
            {name:'password-2', placeholder:'Пароль еще раз', type:'password'}
        ],
        buttons: [
            {text:'Зарегистрироваться'},
            {text:'Войти', link: '/pages/login/login.html'},
        ]
    },

    profile:{
        title: 'Профиль',
        inputs: [
            {name:'avatar', type:'file', imgsrc:'/default.jpg', classes: ['form-input_profile']},
            {name:'email', placeholder:'Почта', type:'email', disabled:'true', data: 'pochta@pochta.ru', classes: ['form-input_profile']},
            {name:'login', placeholder:'Логин', type:'text', disabled:'true', data: 'MyUserName', classes: ['form-input_profile']},
            {name:'display_name', placeholder:'Отображаемое имя', type:'text', disabled:'true', data: 'MyUserName', classes: ['form-input_profile']},
            {name:'first_name', placeholder:'Имя', type:'text', disabled:'true', data: 'Vasya', classes: ['form-input_profile']},
            {name:'second_name', placeholder:'Фамилия', type:'text', disabled:'true', data: 'Pupkin', classes: ['form-input_profile']},
            {name:'phone', placeholder:'Телефон', type:'tel', disabled:'true', data: '+79999999999', classes: ['form-input_profile']},
        ],
        buttons: [
            {text:'Изменить данные', classes:['form-button_edit']},
            {text:'Изменить пароль', classes:['form-button_change-pass'], link: '#', modal: 'change-pass'},
            {text:'Выйти', link: '#'},
            
        ]
    },

    changepass: {
        title: 'Изменить пароль',
        inputs: [
            {name:'oldPassword', type:'password', placeholder:'Старый пароль'},
            {name:'newPassword', type:'password', placeholder:'Новый пароль'},
        ],
        buttons: [
            {text:'Сохранить'}
            
        ]
    },

    chatlist: [
      {name: '', users: ['user1'], image: ['/exmplAva.jpg'], selected:''},
      {name: '', users: ['user2', 'user1'], image: ['/exmplAva.jpg', '/exmplAva2.jpg'], selected:''},
      {name: 'Some Chat Name', users: ['user1', 'user2'], image: ['/exmplAva2.jpg', '/exmplAva.jpg'], selected:'true'},
    ],
    messages: [
      {user:'user1', avatar:'/exmplAva2.jpg', content: 'Hello', },
      {user:'user2', avatar:'/exmplAva.jpg', content: '', imgs: ['/content1.jpg'] },
      {user:'MyUserName', avatar:'/default.jpg', content: 'sup', status:'my'},
    ]
  }

  export default context;
  