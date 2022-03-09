<template>
  <div>
    <h3 class="mb-3">
      Photos Listing
      <button class="btn btn-primary float-right" data-toggle="modal" data-target="#photoModal">
        Add New Photo
      </button>
    </h3>
    <table class="table table-s">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(photo,i) in photos" :key="photo.id">
          <td>{{ photo.name }}</td>
          <td>{{ photo.description }}</td>
          <td @click.prevent="loadPhoto(i)" class="text-center"><a href="#">Edit</a></td>
          <td @click.prevent="delPhoto(i,photo.id)" class="text-center"><a href="#">Delete</a></td>
        </tr>
      </tbody>
    </table>

    <!-- Photos Modal -->
    <div class="modal fade" id="photoModal" ref="photoModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ edit ? 'Edit Photo' : 'Add New Photo' }}</h5>
            <button @click="clearForm()" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="photoForm" ref="photoForm">
              <div class="form-group">
                <div v-if="!photo.photo">
                  <label for="photo">Upload Photo</label>
                  <input @change="selectPhoto" type="file" id="photo" class="form-control">
                </div>
                <div v-else>
                  <div v-if="photo.photo && !photo.photoPreview">
                    <img :src="`${baseURL}/storage/gallery/${photo.photo}`" alt="Preview" style="max-width: 100px">
                    <button @click.prevent="photo.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                  <div v-else-if="photo.photo && photo.photoPreview">
                    <img :src="photo.photoPreview" alt="Preview" style="max-width: 100px">
                    <button @click.prevent="photo.photo = ''" class="btn btn-warning ml-3">Remove Photo</button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="photo.name" id="name" class="form-control">
              </div>
              <div class="form-group">
                <label for="description">Photo Description</label>
                <textarea name="description" v-model="photo.description" 
                  id="description" class="form-control" cols="30" rows="2">
                </textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click.prevent="clearForm" type="button" class="btn btn-secondary">Clear</button>
            <button @click.prevent="validateData" type="button" class="btn btn-primary">
              {{ edit ? 'Save Changes' : 'Add Photo' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      photo: { id:'', name:'', description:'', photo:'', photoPreview:'' },
      edit: false
    }
  },
  computed: {
    ...mapGetters(['photos','apiURL', 'baseURL']),
  },
  methods: {
    ...mapActions(['addPhoto', 'updatePhoto', 'removePhoto']),
    selectPhoto(e) {
      this.photo.photo = e.target.files[0]; this.photo.photoPreview = URL.createObjectURL(this.photo.photo);
    },
    validateData() {
      this.sendData();
    },
    async sendData() {
      const vm = this;
      if(vm.edit) {
        // edit data
        let formData = new FormData(vm.$refs.photoForm)
        formData.append('photo', vm.photo.photo)
        formData.append('_method', 'PUT')
        formData.append('id', vm.photo.id)
        this.updatePhoto(formData)
        vm.$jQuery('#photoModal').modal('hide');
        vm.clearForm()
        // const { data: { data } } = await vm.$axios.post(`${vm.apiURL}/pages`, formData)
        //   vm.UPDATE_PAGE(data); vm.$swal('Page Updated', 'Page have been successfully updated','success');
        //   vm.$jQuery('#pageModal').modal('hide');
          
        
      } else {
        // add data
        let formData = new FormData(vm.$refs.photoForm)
        formData.append('photo', vm.photo.photo)
        this.addPhoto(formData)
        vm.$jQuery('#photoModal').modal('hide');
        vm.clearForm();
        // const { data: { data } } = await vm.$axios.post(`${vm.apiURL}/pages`, formData)
        //   vm.ADD_PAGE(data); vm.$swal('Page Added','Page have been successfully added','success');
        //   vm.$jQuery('#pageModal').modal('hide')
      }
    },
    loadPhoto(i) {
      this.edit = true; this.$jQuery('#photoModal').modal('show')
      this.photo.id = this.photos[i].id;
      this.photo.name = this.photos[i].name;
      this.photo.description = this.photos[i].description;
      this.photo.photo = this.photos[i].photo;
    },
    delPhoto(i,id) {
      this.$swal.fire({
        title: 'Are you sure you want to delete this photo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.removePhoto({ index:i, photoID: id })
          // this.$axios.delete(`${this.apiURL}/pages/${id}`)
          //   .then(res => {
          //     if(res.status === 200) this.DELETE_PAGE(i);
          //   })
          
          // this.$swal.fire('Deleted!', '', 'success')
        } else if (result.isDenied) {
          this.$swal.fire('Photo not deleted', '', 'info')
        }
      })
    },
    clearForm() {
      this.photo.name = ''; this.photo.description = ''; this.photo.photo = ''; 
      this.photo.photoPreview = ''; this.edit = false; 
      document.querySelector('#photoForm').reset();
    }
  }
}
</script>