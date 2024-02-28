<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Models\User;
Route::get('/',[UsuarioController::class,'site'])->name('site');
Route::get('/signup',[UsuarioController::class,'showUsuario'])->name('formulario-usuario');
Route::post('/signup',[UsuarioController::class,'storeUsuario'])->name('cadastrar-usuario');
Route::get('/todosUsuario',[UsuarioController::class,'showGerenciador'])->name('todos-usuario');
Route::get('/movies1',[UsuarioController::class,'showMovies'])->name('todos-usuario');
Route::get('/games1',[UsuarioController::class,'showgames'])->name('todos-usuario');
Route::get('/art1',[UsuarioController::class,'showart'])->name('todos-usuario');
Route::get('/login',[UsuarioController::class,'authenticate'])->name('login-acesso');
Route::get('/login',[UsuarioController::class,'showLogin'])->name('login');

Route::get('/abaTekken',[UsuarioController::class,'showabatekken'])->name('todos-usuario');
Route::get('/abaBubsy',[UsuarioController::class,'showababubsy'])->name('todos-usuario');
Route::get('/abaFifa',[UsuarioController::class,'showabafifa'])->name('todos-usuario');
Route::get('/abaCrash',[UsuarioController::class,'showabacrash'])->name('todos-usuario');
Route::get('/abaMetal',[UsuarioController::class,'showabametal'])->name('todos-usuario');
Route::get('/abaResident',[UsuarioController::class,'showabaresident'])->name('todos-usuario');
Route::get('/abaTomb',[UsuarioController::class,'showabatomb'])->name('todos-usuario');
Route::get('/abaStreet',[UsuarioController::class,'showabastreet'])->name('todos-usuario');
Route::get('/abaCrashM',[UsuarioController::class,'showabacrashm'])->name('todos-usuario');
Route::get('/abaResidentM',[UsuarioController::class,'showabaresidentm'])->name('todos-usuario');
Route::get('/abaJogador',[UsuarioController::class,'showabajogador'])->name('todos-usuario');
Route::get('/abaSpider',[UsuarioController::class,'showabaspider'])->name('todos-usuario');
Route::get('/abaSonic',[UsuarioController::class,'showabasonic'])->name('todos-usuario');
Route::get('/abaMario',[UsuarioController::class,'showabamario'])->name('todos-usuario');
Route::get('/abaDonnie',[UsuarioController::class,'showabadonnie'])->name('todos-usuario');
Route::get('/abaTekkenM',[UsuarioController::class,'showabatekkenm'])->name('todos-usuario');
Route::get('/abaCb3',[UsuarioController::class,'showabacb3'])->name('todos-usuario');
Route::get('/abaTn2',[UsuarioController::class,'showabatn2'])->name('todos-usuario');
Route::get('/abaGt',[UsuarioController::class,'showabagt'])->name('todos-usuario');
Route::get('/abaFf7',[UsuarioController::class,'showabaff7'])->name('todos-usuario');

Route::get('/alterarsenha',[UsuarioController::class,'showAlterar'])->name('formulario-Alterar-senha');
Route::put('/alterarBanco/{id}',[UsuarioController::class,'update'])->name('alterarBanco-usuario');



