<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { reactive } from 'vue';

const imagem = reactive({ image: '' });

function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.onload = () => {
        imagem.image = reader.result;
        // Use a imagem carregada aqui
    };
    reader.readAsDataURL(file);
}

import { storeToRefs } from 'pinia';

import { useUsersStore, editarPaciente } from '@/stores';

const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);

usersStore.getAll();

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

function editaPaciente(values, { setErrors }) {
    const editarStore = editarPaciente();

    const paciente = user._object.user;
    paciente['image'] =
        imagem.image !== '' ? imagem.image : user._object.user.image;

    return editarStore
        .editar(paciente)
        .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
    <div class="body__edita__cadastro">
        <h1>Editar Paciente</h1>

        <div class="shell">
            <div class="content__editar__cadastro">
                <div class="imagem">
                    <img :src="user.image" alt="" />
                </div>

                <Form
                    @submit="editaPaciente"
                    :validation-schema="schema"
                    v-slot="{ errors, isSubmitting }"
                    class="form__class editar"
                >
                    <div class="form-group">
                        <label>Nome Completo*</label>
                        <Field
                            name="name"
                            type="text"
                            class="form-control"
                            v-model="user.name"
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
                            v-model="user.motherName"
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
                            v-model="user.nascimento"
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
                            v-model="user.cpf"
                            v-mask="'000.000.000-00'"
                            :class="{ 'is-invalid': errors.cpf }"
                        />
                        <div class="invalid-feedback">{{ errors.cpf }}</div>
                    </div>

                    <div class="form-group">
                        <label>CNS*</label>
                        <Field
                            name="cns"
                            type="text"
                            class="form-control"
                            v-model="user.cns"
                            :class="{ 'is-invalid': errors.cns }"
                        />
                        <div class="invalid-feedback">{{ errors.cns }}</div>
                    </div>

                    <div class="form-group">
                        <label>Cep*</label>
                        <Field
                            name="cep"
                            type="text"
                            class="form-control"
                            v-model="user.cep"
                            v-mask="'00000-000'"
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
                            v-model="user.rua"
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
                            v-model="user.bairro"
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
                            v-model="user.cidade"
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
                            v-model="user.numero"
                            :class="{ 'is-invalid': errors.numero }"
                        />
                        <div class="invalid-feedback">{{ errors.numero }}</div>
                    </div>

                    <div class="form-group">
                        <label>Foto</label>
                        <Field
                            name="image"
                            @change="handleFileUpload"
                            type="file"
                            class="form-control"
                        />
                    </div>

                    <div class="form-group">
                        <button
                            class="btn btn__primary"
                            :disabled="isSubmitting"
                        >
                            Salvar
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
.body__edita__cadastro {
    width: 100%;

    h1 {
        text-align: center;
        @include font-roboto(1.5rem, 700);
        color: $primary;
        text-transform: uppercase;
        margin-bottom: 2rem;
    }

    .content__editar__cadastro {
        width: 100%;

        .imagem {
            width: 12rem;
            height: 12rem;
            margin-bottom: 1rem;

            img {
                object-fit: cover;
                width: 100%;
            }
        }

        .editar {
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