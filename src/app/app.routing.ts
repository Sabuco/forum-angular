// Importar los mopdulois del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

// Importar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

// Array de rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: '**', component: LoginComponent }
];

// Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);