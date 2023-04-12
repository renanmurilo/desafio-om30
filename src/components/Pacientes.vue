<script>
import api from '@/api/axios';
import Trash from '@/components/icons/IconTrash.vue';

export default {
    components: {
        Trash,
    },
    computed: {
        noResults() {
            return this.filteredClients.length === 0;
        },
        filteredClients() {
            this.pacientes;
            let pacientes = this.pacientes.filter((item) => {
                let match = item.attributes.name
                    .toLowerCase()
                    .match(this.searchVal.toLowerCase());

                if (this.types.length && item.type) {
                    return (
                        match && this.types.includes(item.type.toLowerCase())
                    );
                }

                return match;
            });

            return pacientes;
        },
    },
    data() {
        return {
            pacientes: [],
            searchVal: '',
            types: [],
        };
    },
    created() {
        this.getPacientes();
    },
    methods: {
        async getPacientes() {
            const { data } = await api.get('rest/collections/Pacientes');

            this.pacientes = data.data;
        },
        async remove(id) {
            try {
                await api.delete(`rest/collections/Pacientes/${id}`);

                alert('removido com sucesso');
            } catch (error) {
                alert(error);
            }
        },
        editar(id) {
            this.$router.push(`/editar/${id}`);
        },
    },
};
</script>

<template>
    <div class="body__paciente">
        <h2>Pacientes</h2>

        <div class="search__pacientes">
            <form class="search">
                <input
                    type="text"
                    class="field"
                    placeholder="Pesquisar cliente"
                    v-model="searchVal"
                />

                <button type="submit" class="btn__search">
                    <div class="ico__lupa">
                        <Icon icon="ico-lupa" size="22px" />
                    </div>
                </button>
            </form>
        </div>

        <div class="content__paciente">
            <div
                class="grid"
                v-for="(paciente, index) in filteredClients"
                :key="index"
            >
                <h3>{{ paciente.attributes.name }}</h3>

                <a @click.stop.prevent="remove(paciente.uid)" class="remove">
                    <Trash />
                </a>

                <a @click.stop.prevent="editar(paciente.uid)" class="edit">
                    edit
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>