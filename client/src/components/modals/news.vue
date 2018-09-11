<template>
    <v-dialog v-model="visible" persistent max-width="700px">
        <v-card>
            <v-card-title>
                <v-icon class="mr-1 primary--text shadow">fas fa-newspaper</v-icon>
                <span class="headline primary--text">Новость</span>
            </v-card-title>
            <v-card-text>
                <v-card-text>
                    <v-form ref="form" class="form" lazy-validation @submit.prevent>
                        <v-file-upload 
                            :disabled="options.remove"
                            label="Картинка" 
                            class="mb-4" 
                            :value="form.picture" 
                            @input="form.picture = arguments[0]" 
                            @form-data="form.blob = arguments[0]"
                            @clear="form.picture = ''"
                        />
                        <v-text-field 
                            :disabled="options.remove"
                            v-model="form.video_url"
                            label="Видео"
                            hint="ссылка на видео"
                            color="primary"
                            @keyup.enter="submit"
                            validate-on-blur
                            :rules="[
                                () => (!!form.video_url && ['youtube', 'vimeo'].includes(form.video_provider)) || !form.video_url || 'Не поддерживаемое видео',
                            ]"
                        />
                        <v-text-field 
                            autofocus
                            :disabled="options.remove"
                            v-model="form.title"
                            label="Заголовок"
                            hint="Например: Нас уже полмиллиона!"
                            required
                            color="primary"
                            :rules="[
                                () => !!form.title || 'This field is required',
                            ]"
                            @keyup.enter="submit"
                            validate-on-blur
                        />
                        <!-- <editor :extensions="extensions">
                            <div class="menubar is-hidden" :class="{ 'is-focused': focused }" slot="menubar" slot-scope="{ nodes, marks, focused }">
                                <div v-if="nodes && marks">

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': marks.bold.active() }"
                                        @click="marks.bold.command"
                                    >
                                        <v-icon>fas fa-bold</v-icon>
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': marks.italic.active() }"
                                        @click="marks.italic.command"
                                    >
                                        <v-icon name="italic" />
                                    </button>

                                    <button
                                        class="menubar__button"
                                        @click="marks.code.command"
                                        :class="{ 'is-active': marks.code.active() }
                                    ">
                                        <v-icon name="code" />
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': nodes.paragraph.active() }"
                                        @click="nodes.paragraph.command"
                                    >
                                        <v-icon name="paragraph" />
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': nodes.heading.active({ level: 1 }) }"
                                        @click="nodes.heading.command({ level: 1 })"
                                    >
                                        H1
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': nodes.heading.active({ level: 2 }) }"
                                        @click="nodes.heading.command({ level: 2 })"
                                    >
                                        H2
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': nodes.heading.active({ level: 3 }) }"
                                        @click="nodes.heading.command({ level: 3 })"
                                    >
                                        H3
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': nodes.bullet_list.active() }"
                                        @click="nodes.bullet_list.command"
                                    >
                                        <v-icon name="ul" />
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': nodes.ordered_list.active() }"
                                        @click="nodes.ordered_list.command"
                                    >
                                        <v-icon name="ol" />
                                    </button>

                                    <button
                                        class="menubar__button"
                                        :class="{ 'is-active': nodes.code_block.active() }"
                                        @click="nodes.code_block.command"
                                    >
                                        <v-icon name="code" />
                                    </button>

                                </div>
                            </div>

                            <div class="editor__content" slot="content" slot-scope="props" v-html="form.text"></div>
                        </editor> -->
                        <vue-editor v-model="form.text" 
                            :disabled="options.remove"
                            useMarkdownShortcuts
                            :editorToolbar="toolbar"/>
                        <!-- <v-textarea 
                            :disabled="options.remove"
                            v-model="form.text"
                            label="Текст"
                            required
                            color="primary"
                            :rules="[
                                () => !!form.text || 'This field is required',
                            ]"
                            validate-on-blur
                        /> -->
                        <v-combobox
                            :disabled="options.remove"
                            v-model="form.tags"
                            label="Новостные тэги"
                            chips
                            clearable
                            multiple
                            
                        >
                            <template slot="selection" slot-scope="data">
                                <v-chip small
                                    :selected="data.selected"
                                    close
                                    @input="form.tags.splice(form.tags.indexOf(data.item), 1)"
                                    :class="options.remove ? 'grey lighten-2 white--text' : 'secondary white--text'"
                                >
                                    <span>{{ data.item }}</span>
                                </v-chip>
                            </template>
                        </v-combobox>
                        <!-- <v-text-field 
                            :disabled="options.remove"
                            v-model="form.tags"
                            label="Тэги"
                            required
                            color="primary"
                            :rules="[
                                () => !!form.tags || 'This field is required',
                            ]"
                            @keyup.enter="submit"
                            validate-on-blur
                        /> -->
                    </v-form>
                    <small>*Требуемые для заполнения поля</small>
                </v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="unimportant" flat @click.native="commit('HIDE_MODAL', { 'news': void 0 })">{{ options.remove ? 'Не удалять' : 'Не сохранять'}}</v-btn>
                
                <v-btn dark :class="options.remove ? 'error' : 'secondary'" flat @click.native="submit">{{ options.remove ? 'Удалить' : 'Cохранить'}}</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>
    import Modal from './class_modal';
    import vFileUpload from '../elements/v-file-upload';
    import urlParser from "js-video-url-parser";
    import { VueEditor } from "vue2-editor";

    import { Editor } from 'tiptap';
    import {
        BlockquoteNode,
        BulletListNode,
        CodeBlockNode,
        HardBreakNode,
        HeadingNode,
        ImageNode,
        ListItemNode,
        OrderedListNode,
        TodoItemNode,
        TodoListNode,
        BoldMark,
        CodeMark,
        ItalicMark,
        LinkMark,
        HistoryExtension,
    } from 'tiptap-extensions'

    export default {
        extends: Modal,
        inheritAttrs: false,
        components: {
            vFileUpload,
            VueEditor,
            Editor
        },
        data() {
            return {
                entity: 'news',
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
                    /* ['blockquote'], */
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }/* , { 'list': 'check' } */],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    /* [{ 'indent': '-1'}, { 'indent': '+1' }], */
                    ['link', 'image'],
                    ['clean']   
                ],
                extensions: [
                    new BlockquoteNode(),
                    new BulletListNode(),
                    new CodeBlockNode(),
                    new HardBreakNode(),
                    new HeadingNode({ maxLevel: 3 }),
                    new ImageNode(),
                    new ListItemNode(),
                    new OrderedListNode(),
                    new TodoItemNode(),
                    new TodoListNode(),
                    new BoldMark(),
                    new CodeMark(),
                    new ItalicMark(),
                    new LinkMark(),
                    new HistoryExtension(),
                ],
            }
        },
        computed: {
            /* endpoint() {
                return 'news.save';
            } */
        },
        methods: {
            
        },
        watch: {
            'form.video_url': function(val) {
                let video = urlParser.parse(val);
                if(video) {
                    this.form.video_provider = video.provider;
                    this.form.video_id = video.id;
                }
                else {
                    this.form.video_provider = void 0;
                    this.form.video_id = void 0;
                }
                ////console.log(this.form.video);
                /* { 
                    mediaType: 'video',
                    id: 'HRb7B9fPhfA',
                    provider: 'youtube' 
                } */
            }
        }
    }    
</script>

<style scoped>
    .ql-snow .ql-tooltip {
        left: 0!important;
    }

    #quill-container {
        max-height: 300px;
    }

    .editor__content {
        border-bottom: 2px solid transparent;
        height: 20vh;
        overflow: auto;
    }

    .editor__content:focus {
        border-bottom: 2px solid var(--primary-color);
    }

    .ProseMirror:focus {
        border-bottom: 2px solid var(--primary-color);
    }

</style>
