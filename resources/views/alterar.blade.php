@extends('padrao')
@section('content')

<div class="container">
    <form class="row g-3" Method="Post">
        @method('put')
        @csrf 
        <div class="col-md-4">
          <p class="d-flex justify-content-center align-items-center">
          <label for="inputEmail" class="form-label">Altere sua email</label>
          <input type="email" class="form-control" name='senhaUsuario' id="inputEmail">
      </div>
  
        <div class="col-md-4">
          <p class="d-flex justify-content-center align-items-center">
            <label for="inputSenha" class="form-label">Altere sua senha</label>
            <input type="password" class="form-control" name='senhaUsuario' id="inputSenha">
        </div>
    
        <div class="col-12">
          <p class="d-flex justify-content-center align-items-center">
            <a href="/games1" type="submit" class="btn btn-primary">Alterar</a>
        </div>
    </form>
</div>

@endSection