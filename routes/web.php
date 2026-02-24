<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

Route::get('/',[UsuarioController::class,'site'])->name('site');
Route::get('/signup',[UsuarioController::class,'showUsuario'])->name('formulario-usuario');
Route::post('/signup',[UsuarioController::class,'storeUsuario'])->name('cadastrar-usuario');
Route::get('/todosUsuario',[UsuarioController::class,'showGerenciador'])->name('todos-usuario');
Route::get('/movies1',[UsuarioController::class,'showMovies'])->name('movies');
Route::get('/games1',[UsuarioController::class,'showgames'])->name('games');
Route::get('/art1',[UsuarioController::class,'showart'])->name('art');
Route::post('/login',[UsuarioController::class,'authenticate'])->name('login-acesso');
Route::get('/login',[UsuarioController::class,'showLogin'])->name('login');

Route::get('/abaTekken',[UsuarioController::class,'showEmbed'])->defaults('slug','tekken')->name('aba-tekken');
Route::get('/abaBubsy',[UsuarioController::class,'showEmbed'])->defaults('slug','bubsy')->name('aba-bubsy');
Route::get('/abaFifa',[UsuarioController::class,'showEmbed'])->defaults('slug','fifa')->name('aba-fifa');
Route::get('/abaCrash',[UsuarioController::class,'showEmbed'])->defaults('slug','crash')->name('aba-crash');
Route::get('/abaMetal',[UsuarioController::class,'showEmbed'])->defaults('slug','metal')->name('aba-metal');
Route::get('/abaResident',[UsuarioController::class,'showEmbed'])->defaults('slug','resident')->name('aba-resident');
Route::get('/abaTomb',[UsuarioController::class,'showEmbed'])->defaults('slug','tomb')->name('aba-tomb');
Route::get('/abaStreet',[UsuarioController::class,'showEmbed'])->defaults('slug','street')->name('aba-street');
Route::get('/abaCrashM',[UsuarioController::class,'showEmbed'])->defaults('slug','crash-movie')->name('aba-crash-movie');
Route::get('/abaResidentM',[UsuarioController::class,'showEmbed'])->defaults('slug','resident-movie')->name('aba-resident-movie');
Route::get('/abaJogador',[UsuarioController::class,'showEmbed'])->defaults('slug','jogador')->name('aba-jogador');
Route::get('/abaSpider',[UsuarioController::class,'showEmbed'])->defaults('slug','spider')->name('aba-spider');
Route::get('/abaSonic',[UsuarioController::class,'showEmbed'])->defaults('slug','sonic')->name('aba-sonic');
Route::get('/abaMario',[UsuarioController::class,'showEmbed'])->defaults('slug','mario')->name('aba-mario');
Route::get('/abaDonnie',[UsuarioController::class,'showEmbed'])->defaults('slug','donnie')->name('aba-donnie');
Route::get('/abaTekkenM',[UsuarioController::class,'showEmbed'])->defaults('slug','tekken-movie')->name('aba-tekken-movie');
Route::get('/abaCb3',[UsuarioController::class,'showEmbed'])->defaults('slug','cb3')->name('aba-cb3');
Route::get('/abaTn2',[UsuarioController::class,'showEmbed'])->defaults('slug','tn2')->name('aba-tn2');
Route::get('/abaGt',[UsuarioController::class,'showEmbed'])->defaults('slug','gt')->name('aba-gt');
Route::get('/abaFf7',[UsuarioController::class,'showEmbed'])->defaults('slug','ff7')->name('aba-ff7');

Route::get('/alterarsenha',[UsuarioController::class,'showAlterar'])->middleware('auth')->name('formulario-Alterar-senha');
Route::put('/alterarBanco/{id}',[UsuarioController::class,'update'])->middleware('auth')->name('alterarBanco-usuario');

Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');



