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
        <h1>Pacientes</h1>

        <div class="shell">
            <div class="content__paciente">
                <div class="search__pacientes">
                    <form class="search">
                        <input
                            type="text"
                            class="field"
                            placeholder="Pesquisar paciente"
                            v-model="searchVal"
                        />
                    </form>
                </div>

                <div class="inner__paciente" v-if="filteredClients.length">
                    <div
                        class="grid"
                        v-for="(paciente, index) in filteredClients"
                        :key="index"
                    >
                        <div class="infos">
                            <div class="image">
                                <img :src="paciente.attributes.image" alt="" />
                            </div>
                            <h3>{{ paciente.attributes.name }}</h3>
                        </div>

                        <div class="buttons">
                            <a
                                @click.stop.prevent="remove(paciente.uid)"
                                class="remove"
                            >
                                <Trash /> <span>Excluir</span>
                            </a>

                            <a
                                @click.stop.prevent="editar(paciente.uid)"
                                class="btn btn__primary"
                            >
                                Editar
                            </a>
                        </div>
                    </div>
                </div>

                <div class="empty" v-else>
                    <h2>Não encontramos o paciente: {{ searchVal }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.body__paciente {
    width: 100%;

    h1 {
        @include font-roboto(1.5rem, 700);
        color: $primary;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 2rem;
    }

    .content__paciente {
        width: 100%;

        .search__pacientes {
            width: 18.75rem;
            margin-bottom: 2rem;

            @media ($mobile) {
                width: 100%;
            }

            .search {
                position: relative;
                width: 100%;

                .field {
                    height: 2.5rem;
                    border-radius: 0.5rem;
                    border: 2px solid $background;
                    padding-left: 0.7rem;
                    width: 100%;
                    @include font-roboto(1rem, 400);
                    color: $primary;

                    &::placeholder {
                        color: gray;
                    }
                }
            }
        }

        .inner__paciente {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            margin: auto;

            .grid {
                width: 28%;
                border: 1px solid $background;
                height: 9.375rem;
                padding: 1rem;
                position: relative;
                margin-right: 5rem;
                border-radius: 0.5rem;
                margin-bottom: 2rem;

                .infos {
                    display: flex;

                    .image {
                        width: 3.125rem;
                        height: 3.125rem;
                        margin-right: 1rem;

                        img {
                            object-fit: cover;
                            width: 100%;
                        }
                    }
                }

                &:nth-child(3n) {
                    margin-right: 0;

                    @media ($mobile) {
                        margin: auto auto 1rem;
                    }
                }

                @media ($mobile) {
                    width: 100%;
                    margin: auto auto 1rem;
                }

                h3 {
                    @include font-roboto(1.25rem, 700);
                    color: $primary;
                    letter-spacing: 0.1rem;
                    text-transform: capitalize;
                }

                .remove {
                    display: flex;
                    align-items: center;
                    position: absolute;
                    bottom: 1rem;
                    left: 1rem;
                    border: 1px solid $red;
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                    color: $red;

                    span {
                        @include font-roboto(1rem, 400);
                        color: $red;
                        margin-left: 0.5rem;
                    }
                }

                .btn__primary {
                    width: 6.25rem;
                    position: absolute;
                    right: 1rem;
                    bottom: 1rem;
                }
            }
        }

        .empty {
            width: 100%;

            h2 {
                @include font-roboto(1.5rem, 700);
                color: $primary;

                @media ($mobile) {
                    font-size: 1.25rem;
                }
            }
        }
    }
}
</style>
