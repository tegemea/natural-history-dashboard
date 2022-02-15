<template>
  <div>
    <h3 class="mb-3">
      Pages Listing
      <button class="btn btn-primary float-right" data-toggle="modal" data-target="#pageModal">
        Add New Page
      </button>
    </h3>
    <table class="table table-s">
      <thead>
        <tr>
          <th>Name</th>
          <th>SEO Title</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(page,i) in pages" :key="page.id">
          <td>{{ page.name }}</td>
          <td>{{ page.seo_title }}</td>
          <td @click.prevent="loadPage(i)" class="text-center"><a href="#">Edit</a></td>
          <td @click.prevent="removePage(i,page.id)" class="text-center"><a href="#">Delete</a></td>
        </tr>
      </tbody>
    </table>

    <!-- Pages Modal -->
    <div class="modal fade" id="pageModal" ref="pageModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ edit ? 'Edit Page' : 'Add New Page' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="pageForm" ref="pageForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="page.name" id="name" class="form-control">
              </div>
              <div class="form-group">
                <label for="seo_title">SEO Title</label>
                <input type="text" name="seo_title" v-model="page.seoTitle" id="seo_title" class="form-control">
              </div>
              <div class="form-group">
                <label for="meta_description">Meta Description</label>
                <input type="text" name="meta_description" v-model="page.metaDescription" id="meta_description" class="form-control">
              </div>
              <div class="form-group">
                <label for="description">Page Description</label>
                <textarea name="description" v-model="page.description" id="description" cols="30" rows="6" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <div v-if="!page.photo">
                  <label for="photo">Upload Photo</label>
                  <input @change="selectPhoto" type="file" id="photo" class="form-control">
                </div>
                <div v-else>
                  <div v-if="page.photo && !page.photoPreview">
                    <img :src="`${baseURL}/storage/page_photos/${page.photo}`" alt="Preview" style="max-width: 100px">
                    <button @click.prevent="page.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                  <div v-else-if="page.photo && page.photoPreview">
                    <img :src="page.photoPreview" alt="Preview" style="max-width: 100px">
                    <button @click.prevent="page.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click.prevent="clearPageForm" type="button" class="btn btn-secondary">Clear</button>
            <button @click.prevent="validateData" type="button" class="btn btn-primary">
              {{ edit ? 'Save Changes' : 'Add Page' }}
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
      page: { id:'', name:'', seoTitle:'', metaDescription:'', description:'', photo:'', photoPreview:'' },
      edit: false,
    }
  },
  computed: {
    ...mapGetters(['pages','apiURL', 'baseURL']),
  },
  methods: {
    ...mapMutations(['ADD_PAGE', 'UPDATE_PAGE', 'DELETE_PAGE']),
    selectPhoto(e) {
      this.page.photo = e.target.files[0]; this.page.photoPreview = URL.createObjectURL(this.page.photo);
    },
    validateData() {
      this.sendData();
    },
    async sendData() {
      const vm = this;
      if(vm.edit) {
        // edit data
        let formData = new FormData(vm.$refs.pageForm)
        formData.append('photo', vm.page.photo)
        formData.append('_method', 'PUT')
        formData.append('id', vm.page.id)
        const { data: { data } } = await vm.$axios.post(`${vm.apiURL}/pages`, formData)
          vm.UPDATE_PAGE(data); vm.$swal('Page Updated', 'Page have been successfully updated','success');
          vm.$jQuery('#pageModal').modal('hide');
          
        
      } else {
        // add data
        let formData = new FormData(vm.$refs.pageForm)
        formData.append('photo', vm.page.photo)
        const { data: { data } } = await vm.$axios.post(`${vm.apiURL}/pages`, formData)
          vm.ADD_PAGE(data); vm.$swal('Page Added','Page have been successfully added','success');
          vm.$jQuery('#pageModal').modal('hide')
      }
    },
    loadPage(i) {
      this.edit = true; this.$jQuery('#pageModal').modal('show')
      this.page.id = this.pages[i].id;
      this.page.name = this.pages[i].name;
      this.page.seoTitle = this.pages[i].seo_title;
      this.page.metaDescription = this.pages[i].metaDescription;
      this.page.description = this.pages[i].description;
      this.page.photo = this.pages[i].photo;
    },
    removePage(i,id) {
      this.$swal.fire({
        title: 'Are you sure you want to delete this page?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$axios.delete(`${this.apiURL}/pages/${id}`)
            .then(res => {
              if(res.status === 200) this.DELETE_PAGE(i);
            })
          
          this.$swal.fire('Deleted!', '', 'success')
        } else if (result.isDenied) {
          this.$swal.fire('Page not deleted', '', 'info')
        }
      })
    },
    clearPageForm() {
      this.page.name = ''; this.page.seoTitle = ''; this.page.metaDescription = '';
      this.page.description = ''; this.page.photo = ''; this.page.photoPreview = '';
      this.edit = false; document.querySelector('#pageForm').reset();
    }
  }
}
</script>