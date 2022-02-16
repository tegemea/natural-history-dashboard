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
          <tr v-for="whatToDoWhen in whatToDoWhens" :key="whatToDoWhen.id">
            <td>{{ whatToDoWhen.name }}</td>
            <td>{{ whatToDoWhen.seo_title }}</td>
            <td><a href="#">Edit</a></td>
            <td><a href="#">Delete</a></td>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control">
              </div>
              <div class="form-group">
                <label for="seo_title">SEO Title</label>
                <input type="text" name="seo_title" id="seo_title" class="form-control">
              </div>
              <div class="form-group">
                <label for="meta_description">Meta Description</label>
                <input type="text" name="meta_description" id="meta_description" class="form-control">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="4" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <input type="file" name="photo" id="photo" class="form-control">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click.prevent="clearTheForm" type="button" class="btn btn-secondary">Close</button>
            <button type="button" class="btn btn-primary">{{ edit ? 'Save Changes' : 'Add What to do When' }}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      WhatToDoWhen: { id:'', name:'', seoTitle:'', metaDescription:'', description:'', photo:'', photoPreview:'' },
      edit: false
    }
  },
  computed: {
    ...mapGetters(['whatToDoWhens'])
  },
  methods: {
    clearTheForm() {
      this.WhatToDoWhen.id = ''; this.WhatToDoWhen.name = ''; this.WhatToDoWhen.seoTitle = ''; 
      this.WhatToDoWhen.metaDescription = ''; this.WhatToDoWhen.description = ''; 
      this.WhatToDoWhen.photo = ''; this.WhatToDoWhen.photoPreview = ''; this.edit = false;
      document.querySelector('#theForm').reset();
    }
  }
}
</script>