import { defineStore } from 'pinia';
import { fetchWrapper }  from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}rest/collections/Pacientes`;

export const createPaciente = defineStore({
    id: 'createPaciente',
    actions: {
        async register(paciente) {
            try {
                await fetchWrapper.post(`${baseUrl}`, 
                   paciente
                )

                alert('Sucesso')
            } catch (error) {
                console.log(error);
            }
        }
    }
})