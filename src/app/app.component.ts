import { Component, OnInit, AfterViewChecked, DoCheck, AfterContentInit, AfterContentChecked } from '@angular/core';
import { of } from 'rxjs';
import { MenuItem, TreeNode } from 'primeng/api';
@Component({
  selector: 'myapp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angularndbr';

  filesTree11: TreeNode[];
  files: TreeNode[];
  selectedFile: TreeNode;
  count = 0;
  items: MenuItem[];

  nodeSelect($event) {
      this.executeSA();
    console.log($event.node)
  }
  executeSA(){
    this.processTreeNodes(this.filesTree11, null);
  }

  ngOnInit() {
    this.items = [
      { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFile(this.selectedFile) }
    ];

    this.getFiles().subscribe(res => {
      this.filesTree11 = res;
    });
  }

  expandAll() {
    this.filesTree11.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.filesTree11.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  viewFile(node: TreeNode) {
    console.log(node);
  }

  getFiles() {
    this.files = [{
      label: 'Root',
      children: [
        {
          'label': 'Documents',
          'data': { 'id': 1, 'name': 'Documents Folder' },
          'expandedIcon': 'fa fa-folder-open',
          'collapsedIcon': 'fa fa-folder',
          'children': [{
            'label': 'Work',
            'data': { 'id': 2, 'name': 'Work Folder' },
            'expandedIcon': 'fa fa-folder-open',
            'collapsedIcon': 'fa fa-folder',
            'children': [{
              'label': 'Expenses.doc',
              'icon': 'fa fa-file-word-o',
              'data': { 'id': 3, 'name': 'Expenses Document' }
            }, {
              'label': 'Resume.doc',
              'icon': 'fa fa-file-word-o',
              'data': { 'id': 4, 'name': 'Resume Document' }
            }]
          },
          {
            'label': 'Home',
            'data': { 'id': 5, 'name': 'Home Folder' },
            'expandedIcon': 'fa fa-folder-open',
            'collapsedIcon': 'fa fa-folder',
            'children': [{
              'label': 'Work',
              'data': { 'id': 6, 'name': 'Work Folder' },
              'expandedIcon': 'fa fa-folder-open',
              'collapsedIcon': 'fa fa-folder',
              'children': [{
                'label': 'Expenses.doc',
                'icon': 'fa fa-file-word-o',
                'data': { 'id': 7, 'name': 'Expenses Document' }
              }, {
                'label': 'Resume.doc',
                'icon': 'fa fa-file-word-o',
                'data': { 'id': 8, 'name': 'Resume Document' }
              }]
            },
            {
              'label': 'Home',
              'data': { 'id': 8, 'name': 'Home Folder' },
              'expandedIcon': 'fa fa-folder-open',
              'collapsedIcon': 'fa fa-folder',
              'children': [{
                'label': 'Work',
                'data': { 'id': 9, 'name': 'Work Document' },
                'expandedIcon': 'fa fa-folder-open',
                'collapsedIcon': 'fa fa-folder',
                'children': [{
                  'label': 'Expenses.doc',
                  'icon': 'fa fa-file-word-o',
                  'data': { 'id': 10, 'name': 'Expenses Document' }
                }, {
                  'label': 'Resume.doc',
                  'icon': 'fa fa-file-word-o',
                  'data': { 'id': 11, 'name': 'Expenses Document' }
                }]
              },
              {
                'label': 'Home',
                'data': { 'id': 12, 'name': 'Home Folder' },
                'expandedIcon': 'fa fa-folder-open',
                'collapsedIcon': 'fa fa-folder',
                'children': [{
                  'label': 'Work',
                  'data': { 'id': 13, 'name': 'Work Folder' },
                  'expandedIcon': 'fa fa-folder-open',
                  'collapsedIcon': 'fa fa-folder',
                  'children': [{
                    'label': 'Expenses.doc',
                    'icon': 'fa fa-file-word-o',
                    'data': { 'id': 14, 'name': 'Expenses Document' }
                  }, { 'label': 'Resume.doc', 'icon': 'fa fa-file-word-o', 'data': 'Resume Document' }]
                },
                {
                  'label': 'Home',
                  'data': { 'id': 15, 'name': 'Home Folder' },
                  'expandedIcon': 'fa fa-folder-open',
                  'collapsedIcon': 'fa fa-folder',
                  'children': [{
                    'label': 'Invoices.txt',
                    'icon': 'fa fa-file-word-o',
                    'data': { 'id': 16, 'name': 'Invoices for this month' }
                  }]
                }]
              }]
            }]
          }]
        },
        {
          'label': 'Pictures',
          'data': 'Pictures Folder',
          'expandedIcon': 'fa fa-folder-open',
          'collapsedIcon': 'fa fa-folder',
          'children': [
            { 'label': 'barcelona.jpg', 'icon': 'fa fa-file-image-o', 'data': 'Barcelona Photo' },
            { 'label': 'logo.jpg', 'icon': 'fa fa-file-image-o', 'data': 'PrimeFaces Logo' },
            { 'label': 'primeui.png', 'icon': 'fa fa-file-image-o', 'data': 'PrimeUI Logo' }]
        },
        {
          'label': 'Movies',
          'data': 'Movies Folder',
          'expandedIcon': 'fa fa-folder-open',
          'collapsedIcon': 'fa fa-folder',
          'children': [{
            'label': 'Al Pacino',
            'data': 'Pacino Movies',
            'children': [{ 'label': 'Scarface', 'icon': 'fa fa-file-video-o', 'data': 'Scarface Movie' }, {
              'label': 'Serpico',
              'icon': 'fa fa-file-video-o',
              'data': 'Serpico Movie'
            }]
          },
          {
            'label': 'Robert De Niro',
            'data': 'De Niro Movies',
            'children': [{
              'label': 'Goodfellas',
              'icon': 'fa fa-file-video-o',
              'data': 'Goodfellas Movie'
            }, { 'label': 'Untouchables', 'icon': 'fa fa-file-video-o', 'data': 'Untouchables Movie' }]
          }]
        }
      ]
    }];
    return of(this.files);
    // this.processTreeNodes(this.filesTree11, null);
    // this.checkTreeNodes(this.filesTree11);

  }

  private processTreeNodes(treeNode: TreeNode[], parent: TreeNode) {
    for (const node of treeNode) {
      if (parent != null) {
        node.parent = parent;
      }
      if (node.children && node.children.length > 0) {
        this.processTreeNodes(node.children, node);
      }
      // node.label += '@'
    }

  }

  private checkTreeNodes(treeNode: TreeNode[]) {
    for (const node of treeNode) {
      node.parent != null ?
        console.log('>> ' + node.parent.label + ' > ' + node.label) :
        console.log('>> ' + 'null');
      if (node.children && node.children.length > 0) {
        this.checkTreeNodes(node.children);
      }
    }
  }

}