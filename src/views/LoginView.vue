<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    email: Yup.string().required('email is required'),
    password: Yup.string().required('Password is required'),
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { email, password } = values;

    return authStore
        .login(email, password)
        .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
    <div class="shell">
        <div class="alert-info">
            <p>E-mail: renanmurilosantosg@gmail.com</p>
            <p>Password: 123456</p>
        </div>

        <h1 class="text-center">Login</h1>

        <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors, isSubmitting }"
            class="form__class"
        >
            <div class="form-group">
                <label>email</label>
                <Field
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                />
                <div class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <div class="form-group">
                <label>Password</label>
                <Field
                    name="password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn__primary" :disabled="isSubmitting">
                    Login
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
                {{ errors.apiError }}
            </div>
        </Form>
    </div>
</template>

<style lang="scss">
.alert-info {
    background-color: $background;
    border-radius: 0.75rem;
    padding: 1rem;
    @include font-roboto(1rem, 400);
    color: $primary;
    max-width: 50%;
    margin: 2rem auto;

    @media ($mobile) {
        max-width: 90%;
    }
}

.text-center {
    @include font-roboto(1.5rem, 700);
    text-transform: uppercase;
    text-align: center;
    color: $primary;
}

.form__class {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem auto;

    .form-group {
        display: flex;
        flex-direction: column;
        width: 18.75rem;
        margin-bottom: 2rem;

        @media ($mobile) {
            margin-bottom: 1rem;
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

            &.is-invalid {
                border-color: $red;
            }
        }

        .invalid-feedback {
            @include font-roboto(0.75rem, 400);
            color: $red;
            margin-top: 0.5rem;
        }

        .btn__primary {
            &[disabled] {
                opacity: 0.7;
            }
        }
    }
}
</style>
