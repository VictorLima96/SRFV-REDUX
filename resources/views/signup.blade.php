@extends('padrao')
@section('content')

<section class="py-5">
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card" style="border-radius: 23px;">
          <div class="card-body p-4 p-md-5 text-center">
            <form method="post" action="{{ route('cadastrar-usuario') }}">
              @csrf

              <h2 class="fw-bold mb-2 text-uppercase">Cadastrar</h2>
              <p class="text-white-50 mb-4">Preencha os dados abaixo para criar sua conta</p>

              @if($errors->any())
                <div class="alert alert-danger">{{ $errors->first() }}</div>
              @endif

              <div class="form-outline mb-4">
                <label for="inputNome" class="form-label">Nome</label>
                <input type="text" class="form-control form-control-lg" name="name" id="inputNome" placeholder="Insira seu nome" required>
              </div>

              <div class="form-outline mb-4">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control form-control-lg" name="email" id="inputEmail" placeholder="Insira seu email" required>
              </div>

              <div class="form-outline mb-4">
                <label for="inputSenha" class="form-label">Senha</label>
                <input type="password" class="form-control form-control-lg" name="password" id="inputSenha" placeholder="Sua senha" required>
              </div>

              <div class="form-check d-flex justify-content-center mb-4">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                <label class="form-check-label" for="form2Example3c">
                  Concordo com os <a href="https://policies.google.com/terms?hl=pt-BR" target="_blank">Termos de serviço</a>
                </label>
              </div>

              <button type="submit" class="btn btn-primary btn-lg px-5">Registrar</button>

              <div class="mt-4">
                <p class="mb-0">Já possui uma conta? <a href="/login" class="text-white-50 fw-bold">Entrar</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

@endsection