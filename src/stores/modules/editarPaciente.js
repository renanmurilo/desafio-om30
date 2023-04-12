import { defineStore } from 'pinia';
import router from "@/router";

import { fetchWrapper }  from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const editarPaciente = defineStore({
    id: 'editarPaciente',
    actions: {
        async editar(user) {
            const route = router.currentRoute._value.params.id;

            try {
                await fetchWrapper.patch(`${baseUrl}rest/collections/Pacientes/${route}`, 
                    user
                )

                alert('Sucesso')
            } catch (error) {
                console.log(error);
            }
        }
    }
})