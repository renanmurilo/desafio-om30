<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { reactive, ref } from 'vue';
import api from '@/api/axios';
import { useCPF } from '@/utils/ComposableCpf.js';
import { useCNS } from '@/utils/ComposableCns.js';

import { createPaciente } from '@/stores';

const schema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    motherName: Yup.string().required('nameMother is required'),
    nascimento: Yup.string().required('nascimento is required'),
    cpf: Yup.string().required('cpf is required'),
    cns: Yup.string().required('cns is required'),
    cep: Yup.string().required('cep is required'),
    rua: Yup.string().required('rua is required'),
    numero: Yup.string().required('numero is required'),
    bairro: Yup.string().required('bairro is required'),
    cidade: Yup.string().required('estado is required'),
});

const paciente = reactive({
    name: '',
    motherName: '',
    nascimento: '',
    cpf: '',
    cns: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    image: '',
});

function handleFileUpload(event) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        paciente.image = reader.result;
    };
    reader.readAsDataURL(file);
}

const cpfDemo = useCPF();
const validCpf = ref(true);
const cnsUse = useCNS();
const validCns = ref(true);

function validCPF() {
    validCpf.value = cpfDemo.isValidCPF(paciente.cpf);
}

function validCNS() {
    validCns.value = cnsUse.validarCNS(paciente.cns);
}

async function validarCep() {
    const cep = paciente.cep.replace('-', '');

    const { data } = await api.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (data.erro) {
        alert(data.erro);
    } else {
        paciente.rua = data.logradouro;
        paciente.bairro = data.bairro;
        paciente.cidade = data.localidade;
    }
}

function onSubmit(values, { setErrors }) {
    const createStore = createPaciente();

    return createStore
        .register(paciente)
        .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
    <div class="body__cadastro">
        <h1>Cadastro</h1>

        <div class="shell">
            <div class="content__cadastro">
                <Form
                    @submit="onSubmit"
                    :validation-schema="schema"
                    v-slot="{ errors, isSubmitting }"
                    class="form__class cadastro"
                >
                    <div class="form-group">
                        <label>Nome Completo*</label>
                        <Field
                            name="name"
                            type="text"
                            class="form-control"
                            v-model="paciente.name"
                            :class="{ 'is-invalid': errors.name }"
                        />
                        <div class="invalid-feedback">{{ errors.name }}</div>
                    </div>

                    <div class="form-group">
                        <label>Nome Completo da Mãe*</label>
                        <Field
                            name="motherName"
                            type="text"
                            class="form-control"
                            v-model="paciente.motherName"
                            :class="{ 'is-invalid': errors.motherName }"
                        />
                        <div class="invalid-feedback">
                            {{ errors.motherName }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Data de nascimento*</label>
                        <Field
                            name="nascimento"
                            type="text"
                            class="form-control"
                            v-mask="'00/00/0000'"
                            v-model="paciente.nascimento"
                            :class="{ 'is-invalid': errors.nascimento }"
                        />
                        <div class="invalid-feedback">
                            {{ errors.nascimento }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label>CPF*</label>
                        <Field
                            name="cpf"
                            type="text"
                            class="form-control"
                            v-mask="'000.000.000-00'"
                            v-model="paciente.cpf"
                            @change="validCPF"
                            :class="{ 'is-invalid': errors.cpf || !validCpf }"
                        />
                        <div class="invalid-feedback">{{ errors.cpf }}</div>
                        <div class="invalid-feedback" v-if="!validCpf">
                            cpf inválido
                        </div>
                    </div>

                    <div class="form-group">
                        <label>CNS*</label>
                        <Field
                            name="cns"
                            type="text"
                            class="form-control"
                            v-model="paciente.cns"
                            v-mask="'000000000000000'"
                            @change="validCNS"
                            :class="{ 'is-invalid': errors.cns || !validCns }"
                        />
                        <div class="invalid-feedback">{{ errors.cns }}</div>
                        <div class="invalid-feedback" v-if="!validCns">
                            Cns inválido
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Cep*</label>
                        <Field
                            name="cep"
                            type="text"
                            class="form-control"
                            v-mask="'00000-000'"
                            v-model="paciente.cep"
                            @change="validarCep"
                            :class="{ 'is-invalid': errors.cep }"
                        />
                        <div class="invalid-feedback">{{ errors.cep }}</div>
                    </div>

                    <div class="form-group">
                        <label>Rua*</label>
                        <Field
                            name="rua"
                            type="text"
                            class="form-control"
                            v-model="paciente.rua"
                            disabled
                            :class="{ 'is-invalid': errors.rua }"
                        />
                        <div class="invalid-feedback">{{ errors.rua }}</div>
                    </div>

                    <div class="form-group">
                        <label>Bairro*</label>
                        <Field
                            name="bairro"
                            type="text"
                            class="form-control"
                            v-model="paciente.bairro"
                            disabled
                            :class="{ 'is-invalid': errors.bairro }"
                        />
                        <div class="invalid-feedback">{{ errors.bairro }}</div>
                    </div>

                    <div class="form-group">
                        <label>Cidade*</label>
                        <Field
                            name="cidade"
                            type="text"
                            class="form-control"
                            v-model="paciente.cidade"
                            disabled
                            :class="{ 'is-invalid': errors.cidade }"
                        />
                        <div class="invalid-feedback">{{ errors.cidade }}</div>
                    </div>

                    <div class="form-group">
                        <label>numero*</label>
                        <Field
                            name="numero"
                            type="text"
                            class="form-control"
                            v-model="paciente.numero"
                            :class="{ 'is-invalid': errors.numero }"
                        />
                        <div class="invalid-feedback">{{ errors.numero }}</div>
                    </div>

                    <div class="form-group">
                        <label>Foto</label>
                        <Field
                            name="image"
                            type="file"
                            @change="handleFileUpload"
                            class="form-control"
                        />
                    </div>

                    <div class="form-group">
                        <button
                            class="btn btn__primary"
                            :disabled="isSubmitting"
                        >
                            <span
                                v-show="isSubmitting"
                                class="spinner-border spinner-border-sm mr-1"
                            ></span>
                            Criar Paciente
                        </button>
                    </div>
                    <div
                        v-if="errors.apiError"
                        class="alert alert-danger mt-3 mb-0"
                    >
                        {{ errors.apiError }}
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.body__cadastro {
    width: 100%;

    h1 {
        text-align: center;
        @include font-roboto(1.5rem, 700);
        color: $primary;
        text-transform: uppercase;
        margin-bottom: 2rem;
    }

    .content__cadastro {
        display: flex;
        width: 100%;

        .cadastro {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            @media ($mobile) {
                justify-content: center;
            }

            .form-group {
                width: 30%;

                @media ($mobile) {
                    width: 100%;
                }

                label {
                    @include font-roboto(1rem, 400);
                    color: $primary;
                    text-transform: capitalize;
                    margin-bottom: 0.5rem;
                }

                .form-control {
                    height: 2.5rem;
                    border-radius: 0.5rem;
                    border: 2px solid $background;
                    padding: 0 0.7rem;
                    @include font-roboto(1rem, 400);
                    color: $primary;

                    &.is-invalid {
                        border-color: $red;
                    }
                }

                .btn__primary {
                    margin: 2rem 0 0 auto;
                }
            }
        }
    }
}
</style>