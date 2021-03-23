import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Incio', url: '/folder/Inbox', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Favoritos', url: '/folder/Favorites', icon: 'star' },
    { title: 'Historial', url: '/folder/Outbox', icon: 'archive' },
    { title: 'Facturacion', url: '/folder/Archived', icon: 'reader' },
    { title: 'Metodo de Pago', url: '/folder/Trash', icon: 'wallet' },
    { title: 'Configuracion', url: '/folder/Spam', icon: 'settings' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public user ={
    name:"Romina",
    lastname:"Sanchez",    
    porcentage:0.5
  };
  
  constructor() {
    this.user=JSON.parse(localStorage.getItem('user'));
  }
}
