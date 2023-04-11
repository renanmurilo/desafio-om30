import { defineStore } from 'pinia';
import { fetchWrapper }  from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}rest/collections/Pacientes`;

export const createPaciente = defineStore({
    id: 'createPaciente',
    actions: {
        async register(name, motherName, nascimento, cpf, cns, cep, rua, numero, bairro, cidade, image) {
            try {
                await fetchWrapper.post(`${baseUrl}`, {
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
                    image
                })

                alert('Sucesso')
            } catch (error) {
                console.log(error);
            }
        }
    }
})