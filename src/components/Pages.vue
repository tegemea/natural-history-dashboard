<template>
  <div>
    <h3 class="mb-3">
      Pages Listing
      <button class="btn btn-primary float-right" data-toggle="modal" data-target="#staticBackdrop">
        Add New Page
      </button>
    </h3>
    <table class="table table-s">
      <thead>
        <tr>
          <td>Name</td>
          <td>SEO Title</td>
          <td class="text-center">Edit</td>
          <td class="text-center">Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in pages" :key="page.id">
          <td>{{ page.name }}</td>
          <td>{{ page.seo_title }}</td>
          <td class="text-center"><a href="#">Edit</a></td>
          <td class="text-center"><a href="#">Delete</a></td>
        </tr>
      </tbody>
    </table>

    <!-- Pages Modal -->
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add / Edit Page</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
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
      // 
    }
  },
  computed: {
    ...mapGetters(['pages'])
  }
}
</script>