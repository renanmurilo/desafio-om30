<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

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

function onSubmit(values, { setErrors }) {
    const createStore = createPaciente();
    const {
        name,
        motherName,
        nascimento,
        cpf,
        cns,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        image,
    } = values;

    return createStore
        .register(
            name,
            motherName,
            nascimento,
            parseInt(cpf),
            parseInt(cns),
            parseInt(cep),
            rua,
            parseInt(numero),
            bairro,
            cidade,
            image
        )
        .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
    <div class="col-md-12">
        <h1>Cadastro</h1>

        <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors, isSubmitting }"
            class="col-sm-4 container"
        >
            <div class="form-group">
                <label>Nome Completo*</label>
                <Field
                    name="name"
                    type="text"
                    class="form-control"
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
                    :class="{ 'is-invalid': errors.motherName }"
                />
                <div class="invalid-feedback">{{ errors.motherName }}</div>
            </div>

            <div class="form-group">
                <label>Data de nascimento*</label>
                <Field
                    name="nascimento"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.nascimento }"
                />
                <div class="invalid-feedback">{{ errors.nascimento }}</div>
            </div>

            <div class="form-group">
                <label>CPF*</label>
                <Field
                    name="cpf"
                    type="text"
                    class="form-control"
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
                    :class="{ 'is-invalid': errors.numero }"
                />
                <div class="invalid-feedback">{{ errors.numero }}</div>
            </div>

            <div class="form-group">
                <label>Foto</label>
                <Field name="image" type="file" class="form-control" />
            </div>

            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span
                        v-show="isSubmitting"
                        class="spinner-border spinner-border-sm mr-1"
                    ></span>
                    Criar Paciente
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
                {{ errors.apiError }}
            </div>
        </Form>
    </div>
</template>

<style lang="scss">
</style>