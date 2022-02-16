<template>
  <div>
    <h3 class="mb-4">
      What To Do When
      <button class="btn btn-primary float-right" data-toggle="modal" data-target="#WhatToDoWhenModal">Add What To Do When</button>
    </h3>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SEO Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(whatToDoWhen,i) in whatToDoWhens" :key="whatToDoWhen.id">
            <td>{{ whatToDoWhen.name }}</td>
            <td>{{ whatToDoWhen.seo_title }}</td>
            <td><a @click.prevent="loadWhatToDoWhen(i)" href="#">Edit</a></td>
            <td><a @click.prevent="removeWhatToDoWhen(i,whatToDoWhen.id)" href="#">Delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- WhatToDoWhen Modal -->
    <div class="modal fade" id="WhatToDoWhenModal" ref="WhatToDoWhenModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ edit ? 'Edit What to do When' : 'Add What to do When' }}</h5>
            <button @click="clearTheForm()" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="WhatToDoWhenForm" ref="WhatToDoWhenForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="WhatToDoWhen.name" id="name" class="form-control">
              </div>
              <div class="form-group">
                <label for="seo_title">SEO Title</label>
                <input type="text" name="seo_title" v-model="WhatToDoWhen.seoTitle" id="seo_title" class="form-control">
              </div>
              <div class="form-group">
                <label for="meta_description">Meta Description</label>
                <input type="text" name="meta_description" v-model="WhatToDoWhen.metaDescription" id="meta_description" class="form-control">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" v-model="WhatToDoWhen.description" id="description" cols="30" rows="4" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <div v-if="!WhatToDoWhen.photo">
                  <input @change="selectPhoto" type="file" name="photo" id="photo" class="form-control">
                </div>
                <div v-else>
                  <div v-if="WhatToDoWhen.photo && !WhatToDoWhen.photoPreview">
                    <img :src="`${baseURL}/storage/what_to_do_when_photos/${WhatToDoWhen.photo}`" alt="Preview" style="max-width: 100px">
                    <button @click.prevent="WhatToDoWhen.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                  <div v-else-if="WhatToDoWhen.photo && WhatToDoWhen.photoPreview">
                    <img :src="WhatToDoWhen.photoPreview" alt="Preview" style="max-width: 100px">
                    <button @click.prevent="WhatToDoWhen.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click.prevent="clearTheForm" type="button" class="btn btn-secondary">Clear</button>
            <button @click.prevent="validateData" type="button" class="btn btn-primary">
              {{ edit ? 'Save Changes' : 'Add What to do When' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      WhatToDoWhen: { id:'', name:'', seoTitle:'', metaDescription:'', description:'', photo:'', photoPreview:'' },
      edit: false
    }
  },
  computed: {
    ...mapGetters(['whatToDoWhens','apiURL','baseURL'])
  },
  methods: {
    ...mapMutations(['ADD_WHAT_TO_DO_WHEN','UPDATE_WHAT_TO_DO_WHEN','DELETE_WHAT_TO_DO_WHEN']),
    selectPhoto(e) {
      this.WhatToDoWhen.photo = e.target.files[0]; 
      this.WhatToDoWhen.photoPreview = URL.createObjectURL(this.WhatToDoWhen.photo);
    },
    validateData() {
      this.sendData()
    },
    async sendData() {
      let vm = this;
      if(vm.edit) {
        // edit data
        let formData = new FormData(vm.$refs.WhatToDoWhenForm)
        formData.append('_method', 'PUT')
        formData.append('photo', vm.WhatToDoWhen.photo)
        formData.append('id', vm.WhatToDoWhen.id)
        const { data : { data } } = await vm.$axios.post(`${vm.apiURL}/what-to-do-when`, formData)
        // console.log(data)
          vm.UPDATE_WHAT_TO_DO_WHEN(data);
          vm.$swal('What to do When Updated', 'details have been successfully updated','success');
          vm.$jQuery('#WhatToDoWhenModal').modal('hide');
      } else {
        // add data
        let formData = new FormData(vm.$refs.WhatToDoWhenForm)
        formData.append('photo', vm.WhatToDoWhen.photo)
        const { data: { data }} = await vm.$axios.post(`${vm.apiURL}/what-to-do-when`, formData)
          vm.ADD_WHAT_TO_DO_WHEN(data);
          vm.$swal('What to do When Added', 'details have been successfully added','success');
          vm.$jQuery('#WhatToDoWhenModal').modal('hide');
      }
    },
    loadWhatToDoWhen(i) {
      this.edit = true; this.$jQuery('#WhatToDoWhenModal').modal('show');
      this.WhatToDoWhen.id = this.whatToDoWhens[i].id
      this.WhatToDoWhen.name = this.whatToDoWhens[i].name
      this.WhatToDoWhen.seoTitle = this.whatToDoWhens[i].seo_title
      this.WhatToDoWhen.metaDescription = this.whatToDoWhens[i].meta_description
      this.WhatToDoWhen.description = this.whatToDoWhens[i].description
      this.WhatToDoWhen.photo = this.whatToDoWhens[i].photo
    },
    removeWhatToDoWhen(i,id) {
      this.$swal.fire({
        title: 'Are you sure you want to delete this What To Do When?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$axios.delete(`${this.apiURL}/what-to-do-when/${id}`)
            .then(res => {
              if(res.status === 200) this.DELETE_WHAT_TO_DO_WHEN(i);
            })
          
          this.$swal.fire('Deleted!', '', 'success')
        } else if (result.isDenied) {
          this.$swal.fire('what-to-do-when not deleted', '', 'info')
        }
      })
    },
    clearTheForm() {
      this.WhatToDoWhen.id = ''; this.WhatToDoWhen.name = ''; this.WhatToDoWhen.seoTitle = ''; 
      this.WhatToDoWhen.metaDescription = ''; this.WhatToDoWhen.description = ''; 
      this.WhatToDoWhen.photo = ''; this.WhatToDoWhen.photoPreview = ''; this.edit = false;
      document.querySelector('#WhatToDoWhenForm').reset();
    }
  }
}
</script>