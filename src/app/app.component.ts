import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, BehaviorSubject, Subscription } from 'rxjs';
import { MenuItem, TreeNode } from 'primeng/api';
import * as _ from 'lodash';

@Component({
  selector: 'myapp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angularndbr';

  filesTree: TreeNode[];
  selectedFile: TreeNode;
  items: MenuItem[];
  copiedNode: TreeNode;
  copiedable = new BehaviorSubject<boolean>(true);
  copiedable$ = this.copiedable.asObservable();
  contextMenuSubscription: Subscription

  nodeSelect($event) {
    this.processTreeNodes(this.filesTree, null);
    //console.log($event.node)
  }
  contextMenuSelect($event) {
    this.nodeSelect($event);
    if (this.copiedNode) {
      const equalsNodes = (this.copiedNode === this.selectedFile) || (this.copiedNode.parent === this.selectedFile);
      this.copiedable.next(equalsNodes);
    }
  }

  copyNode(selectedNode: TreeNode) {
    this.copiedNode = selectedNode;
    this.copiedable.next(false);

  }

  pasteNode(selectedNode: TreeNode) {

    const prox = _.cloneDeep(this.copiedNode);
    selectedNode.children.push(prox);
    selectedNode.expanded = true;
    this.selectedFile = prox;

    this.copiedable.next(true);

    if (this.copiedNode.parent) {
      const children = this.copiedNode.parent.children
      children.splice(children.indexOf(this.copiedNode), 1);
      if (children.length == 0)
        this.copiedNode.parent.expanded = false;
    } else
      this.filesTree.splice(this.filesTree.indexOf(this.copiedNode), 1);
    this.copiedNode = null;
  }

  ngOnInit() {

    // init the Context Menu    
    this.items = [
      {
        label: 'View', icon: 'fa fa-search',
        command: (event) => this.viewFile(this.selectedFile)
      },
      {
        label: 'Copy', icon: 'fa fa-copy',
        command: (event) => this.copyNode(this.selectedFile)
      },
      {
        label: 'Past', icon: 'fa fa-past', disabled: true,
        command: (event) => this.pasteNode(this.selectedFile)
      }
    ];

    // subscription for paste Context Menu
    this.contextMenuSubscription = this.copiedable$.subscribe((value) => {
      this.items[2].disabled = value;
    })

    // call for populate the tree
    this.getFiles().subscribe(res => {
      this.filesTree = res;
    });
  }

  ngOnDestroy() {
    this.contextMenuSubscription.unsubscribe();
  }

  viewFile(node: TreeNode) {
    console.log(node);
  }

  getFiles() {
    const files = [{
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
    return of(files);
  }

  // filling of node.parent of each node in the tree ( Workaround solution )
  private processTreeNodes(treeNode: TreeNode[], parent: TreeNode) {
    for (const node of treeNode) {
      if (parent) {
        node.parent = parent;
      }
      if (node.children && node.children.length > 0) {
        this.processTreeNodes(node.children, node);
      }
    }
  }

}