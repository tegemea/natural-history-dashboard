<template>
  <div>
    <h3 class="mb-4">
      Natural Adventures
      <button class="btn btn-primary float-right" data-toggle="modal" data-target="#adventureModal">Add New Natural Adventure</button>
    </h3>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SEO Title</th>
            <th class="text-center">Edit</th>
            <th class="text-center text-danger">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(adventure, i) in naturalAdventures" :key="adventure.id">
            <td>{{ adventure.name }}</td>
            <td>{{ adventure.seo_title }}</td>
            <td class="text-center"><a @click.prevent="loadNaturalAdventure(i)" href="#">Edit</a></td>
            <td class="text-center"><a @click.prevent="delNaturalAdventure(i)" class="text-danger" href="#">Delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="adventureModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ edit ? 'Edit Natural Adventure' : 'Add New Natural Adventure' }}</h5>
            <button @click="clearForm()" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form ref="adventureForm" id="adventureForm">
              <div class="form-group">
                <label for="name">Natural Adventure Name</label>
                <input type="text" name="name" v-model="adventure.name" id="name" class="form-control">
              </div>
              <div class="form-group">
                <label for="seo_title">Adventure SEO Title</label> <small class="text-black-50">(optional)</small>
                <small v-if="adventure.seoTitle" class="text-black-50 float-right">{{ adventure.seoTitle.length }}/70 characters</small>
                <input type="text" name="seo_title" v-model="adventure.seoTitle" maxlength="70" id="seo_title" class="form-control">
              </div>
              <div class="form-group">
                <label for="meta_description">Adventure Meta Description</label> <small class="text-black-50">(optional)</small>
                <small v-if="adventure.metaDescription" class="text-black-50 float-right">
                  {{ adventure.metaDescription.length }}/160 characters
                </small>
                <textarea name="meta_description" v-model="adventure.metaDescription" id="meta_description" maxlength="160" cols="30" rows="2" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <label for="description">Natural Adventure Description</label>
                <ckeditor :editor="editor" v-model="adventure.description" :config="editorConfig"></ckeditor>
              </div>
              <div class="form-group">
                <div v-if="!adventure.photo">
                  <label for="photo">Upload Photo</label>
                  <input @change="selectPhoto" type="file" name="photo" id="photo" class="form-control">
                </div>
                <div v-else>
                  <div v-if="adventure.photo && !adventure.photoPreview">
                    <img :src="`${baseURL}/storage/natural_adventure_photos/${adventure.photo}`" style="max-width: 100px" alt="Preview">
                    <button @click.prevent="adventure.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                  <div v-else-if="adventure.photo && adventure.photoPreview">
                    <img :src="adventure.photoPreview" style="max-width: 100px" alt="Preview">
                    <button @click.prevent="adventure.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click.prevent="clearForm()" type="button" class="btn btn-secondary">Clear</button>
            <button @click.prevent="validateData" type="button" class="btn btn-primary">
              {{ edit ? 'Save Changes' : 'Add New Natural Adventure' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  data() {
    return {
      adventure: { id:'', name:'', seoTitle:'', metaDescription:'', description:'', photo:'', photoPreview:'' },
      editor: ClassicEditor,
      editorConfig: {},
      edit: false
    }
  },
  computed: {
    ...mapGetters(['naturalAdventures','apiURL','baseURL'])
  },
  methods: {
    ...mapActions(['addNaturalAdventure', 'updateNaturalAdventure', 'removeNaturalAdventure']),
    selectPhoto(e) {
      this.adventure.photo = e.target.files[0]; this.adventure.photoPreview = URL.createObjectURL(this.adventure.photo)
    },
    validateData() {
      this.sendData()
    },
    sendData() {
      if(this.edit) {
        // edit data
        let formData = new FormData(this.$refs.adventureForm)
        formData.append('description', this.adventure.description)
        formData.append('photo', this.adventure.photo)
        formData.append('id', this.adventure.id)
        formData.append('_method', 'PUT')
        this.updateNaturalAdventure(formData)
        this.$jQuery('#adventureModal').modal('hide')
        this.clearForm()

      } else {
        // add data
        let formData = new FormData(this.$refs.adventureForm)
        formData.append('description', this.adventure.description)
        formData.append('photo', this.adventure.photo)
        this.addNaturalAdventure(formData)
        this.$jQuery('#adventureModal').modal('hide')
        this.clearForm()
      }
    },
    loadNaturalAdventure(i) {
      this.edit = true; this.$jQuery('#adventureModal').modal('show');
      this.adventure.id = this.naturalAdventures[i].id
      this.adventure.name = this.naturalAdventures[i].name
      this.adventure.seoTitle = this.naturalAdventures[i].seo_title
      this.adventure.metaDescription = this.naturalAdventures[i].meta_description
      this.adventure.description = this.naturalAdventures[i].description
      this.adventure.photo = this.naturalAdventures[i].photo
    },
    delNaturalAdventure(i) {
      if(confirm('Are you sure you wan to remove this Natural Adventure?')) {
        this.removeNaturalAdventure({ index: i, adventureID: this.naturalAdventures[i].id })
      }
    },
    clearForm() {
      this.adventure.id = ''; this.adventure.name = ''; this.adventure.seoTitle = ''; this.adventure.metaDescription = ''; 
      this.adventure.description = ''; this.adventure.photo = ''; this.adventure.photoPreview = '';
      document.querySelector('#adventureForm').reset(); this.edit = false;
    }
  }
}
</script>