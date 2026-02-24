@extends('padrao')
@section('content')

<section class="py-5">
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card" style="border-radius: 23px;">
          <div class="card-body p-4 p-md-5 text-center">
            <form method="post" action="{{ isset($user) ? route('alterarBanco-usuario', $user->id) : '#' }}">
              @method('put')
              @csrf

              <h2 class="fw-bold mb-2 text-uppercase">Alterar Dados</h2>
              <p class="text-white-50 mb-4">Atualize seu email ou senha</p>

              @if($errors->any())
                <div class="alert alert-danger">{{ $errors->first() }}</div>
              @endif

              <div class="form-outline mb-4">
                <label for="inputEmail" class="form-label">Novo Email</label>
                <input type="email" class="form-control form-control-lg" name="emailUsuario" id="inputEmail" placeholder="Digite seu novo email" value="{{ isset($user) ? $user->email : '' }}">
              </div>

              <div class="form-outline mb-4">
                <label for="inputNome" class="form-label">Nome</label>
                <input type="text" class="form-control form-control-lg" name="nomeUsuario" id="inputNome" placeholder="Digite seu nome" value="{{ isset($user) ? $user->name : '' }}">
              </div>

              <div class="form-outline mb-4">
                <label for="inputSenha" class="form-label">Nova Senha</label>
                <input type="password" class="form-control form-control-lg" name="senhaUsuario" id="inputSenha" placeholder="Digite sua nova senha">
              </div>

              <button type="submit" class="btn btn-primary btn-lg px-5">Alterar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

@endsection